import { useEffect, useRef, useState } from "react";
import profile from "../../assets/profile-icon.svg";
import post1 from "../../assets/riwoo.png";
import "./TimeLine.css";
import SearchModal from "../TimeLine/SearchModal";
import HeartIcon from "../../assets/heart-icon.svg";
import CommentIcon from "../../assets/comment-icon.svg";
import { api } from "../../api/axios";

const REPORT_REASONS = [
    "스팸 및 홍보성 콘텐츠",
    "음란물 또는 성적 콘텐츠",
    "혐오 발언 및 괴롭힘",
    "부적절한 내용 및 기타",
];

const INITIAL_SEARCHES = ["망개떡", "우나기", "ChristmasTree"];

const MOCK_USERS = [
    { id: 1, name: "성호어깨에치여사망", isFollowing: true },
    { id: 2, name: "망개떡", isFollowing: false },
    { id: 3, name: "우나기", isFollowing: false },
    { id: 4, name: "ChristmasTree", isFollowing: false },
    { id: 5, name: "리우사랑단", isFollowing: false },
    { id: 6, name: "덕질은행복", isFollowing: false },
    { id: 7, name: "브넥최고", isFollowing: false },
    { id: 8, name: "성호팬", isFollowing: false },
];

const INITIAL_POSTS = [
    {
        id: 1,
        username: "링링",
        time: "2분 전",
        content:
            "아 진짜 리우 너무 잘생겼어요 미친!! 게다가 오늘 보넥도 상타서 진짜 너무 좋아요❤️",
        images: [post1, post1, post1],
        likedUsers: [MOCK_USERS[0], MOCK_USERS[1], MOCK_USERS[2]],
        comments: [
            {
                id: 101,
                user: "으아내정신",
                time: "1시간 전",
                text: "I love you, riwoo my dear darling S2",
                likes: 0,
                isMine: false,
                replies: [
                    {
                        id: 1011,
                        user: "망개떡",
                        time: "30분 전",
                        text: "저도 동감해요!",
                        likes: 0,
                        isMine: false,
                    },
                ],
            },
            {
                id: 102,
                user: "류류",
                time: "1일 전",
                text: "제발 리우 옷 손민수하고 싶다 저 왼쪽 사진",
                likes: 0,
                isMine: false,
                replies: [],
            },
        ],
    },
    {
        id: 2,
        username: "아레아레RM",
        time: "15분 전",
        content:
            "컴백 너무 기대돼요! X투X 이번벤드에는 티케팅 성공해서 꼭 보러가고 싶어요! 다들 콘서트때 봬요~🍩",
        images: [],
        likedUsers: [
            MOCK_USERS[3],
            MOCK_USERS[4],
            MOCK_USERS[5],
            MOCK_USERS[6],
            MOCK_USERS[7],
        ],
        comments: [
            {
                id: 201,
                user: "망개떡",
                time: "30분 전",
                text: "저도 꼭 가고 싶어요ㅠㅠ 티케팅 파이팅!",
                likes: 5,
            },
        ],
    },
    {
        id: 3,
        username: "주라미",
        time: "2분 전",
        content:
            "지민 I LOVE YOU SO MUCH HAHA!!",
        images: [post1, post1, post1],
        likedUsers: [MOCK_USERS[0], MOCK_USERS[1], MOCK_USERS[2]],
        comments: [
            {
                id: 301,
                user: "으아내정신",
                time: "1시간 전",
                text: "I love you, riwoo my dear darling S2",
                likes: 0,
                isMine: false,
                replies: [
                    {
                        id: 3011,
                        user: "망개떡",
                        time: "30분 전",
                        text: "저도 동감해요!",
                        likes: 0,
                        isMine: false,
                    },
                ],
            },
            {
                id: 302,
                user: "류류",
                time: "1일 전",
                text: "제발 지민 옷 손민수하고 싶다 저 왼쪽 사진",
                likes: 0,
            },
        ],
    },
];

const normalizePost = (post) => ({
    ...post,
    uploadedImageUrls: post?.uploadedImageUrls ?? [],
    likedUsers: post?.likedUsers ?? [],
    comments: post?.comments ?? [],
});

const parseTimelinePage = (data) => {
    const timeline = data?.timeline ?? data?.posts ?? data;
    const items = Array.isArray(timeline) ? timeline : timeline?.items ?? [];

    return {
        items: items.map(normalizePost),
        nextCursor: Array.isArray(timeline) ? null : timeline?.nextCursor ?? null,
        hasNext: Array.isArray(timeline) ? false : Boolean(timeline?.hasNext),
    };
};

export default function TimeLine() {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [activeTab, setActiveTab] = useState("recommend");
    const [friends, setFriends] = useState(INITIAL_FRIENDS);
    const [searchHistory, setSearchHistory] = useState(INITIAL_SEARCHES);
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [likeModalPostId, setLikeModalPostId] = useState(null);
    const [reportModalPostId, setReportModalPostId] = useState(null);
    const [selectedReason, setSelectedReason] = useState("");
    const [commentInput, setCommentInput] = useState("");
    const [showBlockConfirm, setShowBlockConfirm] = useState(false);
    const [replyViewCommentId, setReplyViewCommentId] = useState(null);
    const [showReportReasons, setShowReportReasons] = useState(false);

    // 무한 스크롤
    const [cursor, setCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(null);
    const observerTarget = useRef(null);

    const [posts, setPosts] = useState([]); // 초기값을 빈 배열로 변경
    const [friends, setFriends] = useState([]); // 초기값을 빈 배열로 변경

    // 로딩 및 에러 상태 처리 (UX 향상을 위해 권장)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 통합 main 호출
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setIsLoading(true);
                setHasNextPage(true);

                const res = await api.get(
                    `/posts/timeline/main/${activeTab}?limit=10`
                );
                // const { posts: timeline, recommendedFriends } = res.data;
                const timeline = parseTimelinePage(res.data);
                const timelineItems = timeline.items;
                const recommendedFriends = res.data.recommendedFriends || [];

                console.log("1. post 초기화 : ", res);

                setPosts(timelineItems);
                setFriends(recommendedFriends);

                // 커서 세팅도 백엔드가 주는 nextCursor나 items의 마지막 요소를 활용
                setCursor(timeline.nextCursor);
                setHasNextPage(timeline.hasNext);
            } catch (err) {
                console.error("Timeline 로딩 에러:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, [activeTab]);

    const fetchMorePosts = async () => {
        if (isLoading || !hasNextPage || !cursor) return;

        try {
            setIsLoading(true);

            const res = await api.get(
                `/posts/timeline/${activeTab}?cursor=${cursor}&limit=10`
            );
            const timeline = parseTimelinePage(res.data);
            const nextPosts = timeline.items;
            console.log("2. fetchMorePosts", res.data);

            if (!nextPosts || nextPosts.length === 0) {
                setHasNextPage(false);
                return;
            }
            setPosts((prev) => [...prev, ...nextPosts]);
            setCursor(timeline.nextCursor);
            setHasNextPage(timeline.hasNext);
        } catch (err) {
            console.error("추가 스크롤 에러 : ", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!observerTarget.current || !hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchMorePosts();
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [cursor, hasNextPage, isLoading, activeTab]);

    const selectedPost = posts.find((p) => p.id === selectedPostId);
    const likeTargetPost = posts.find((p) => p.id === likeModalPostId);

    // const followingNames = friends
    //     .filter((friend) => friend.isFollowing)
    //     .map((friend) => friend.name);

    // BE에서 차단, 팔로워 이미 다 거름
    // const visiblePosts = posts.filter(
    //     (post) => !blockedUsers.includes(post.author?.username)
    // );

    const visiblePosts = posts.filter(
        (post) => !blockedUsers.includes(post.author?.username)
    );

    const getCommentsCount = (postItem) => {
        if (!postItem || !postItem.commentCount) return 0;
        if (!Array.isArray(postItem.comments) || postItem.comments.length === 0) {
            return postItem.commentCount;
        }
        // 부모 댓글 수 + 자식 대댓글 수의 총합을 구하여 아이콘 숫자가 비지 않도록 처리
        return postItem.comments.reduce((acc, current) => {
            const replyCount = current.replies ? current.replies.length : 0;
            return acc + 1 + replyCount;
        }, 0);
    };

    const checkIfILiked = (postItem) => {
        if (!postItem || !postItem.likedUsers) return false;
        return postItem.likedUsers.some((user) => user.id === "me");
    };

    const handlePostClick = (postItem) => {
        setSelectedPostId(postItem.id);
        setCommentInput("");
    };

    const handleLikeToggle = (e, postId) => {
        e.stopPropagation();
        const myAccount = { id: "me", name: "나(User)", isFollowing: false };

        setPosts((prevPosts) =>
            prevPosts.map((postItem) => {
                if (postItem.id === postId) {
                    const likedUsers = postItem.likedUsers ?? [];
                    const hasLiked = likedUsers.some(
                        (u) => u.id === "me"
                    );
                    return {
                        ...postItem,
                        likeCount: Math.max(
                            0,
                            (postItem.likeCount || 0) + (hasLiked ? -1 : 1)
                        ),
                        likedUsers: hasLiked
                            ? likedUsers.filter((u) => u.id !== "me")
                            : [...likedUsers, myAccount],
                    };
                }
                return postItem;
            })
        );
    };

    const openLikeModal = (e, postId) => {
        e.stopPropagation();
        setLikeModalPostId(postId);
    };

    // 실시간 변경 사항이 모달 내부 컴포넌트까지 완벽히 감지하도록 posts가 바뀔 때마다 동기화 수행
    const selectedPost = posts.find((p) => p.id === selectedPostId);
    const likeTargetPost = posts.find((p) => p.id === likeModalPostId);

    const visiblePosts = posts.filter(
        (post) => !blockedUsers.includes(post.username)
    );

    const getCommentsCount = (postItem) => {
        if (!postItem || !postItem.comments) return 0;
        // 부모 댓글 수 + 자식 대댓글 수의 총합을 구하여 아이콘 숫자가 비지 않도록 처리
        return postItem.comments.reduce((acc, current) => {
            const replyCount = current.replies ? current.replies.length : 0;
            return acc + 1 + replyCount;
        }, 0);
    };

    const checkIfILiked = (postItem) => {
        if (!postItem || !postItem.likedUsers) return false;
        return postItem.likedUsers.some((user) => user.id === "me");
    };

    const handlePostClick = (postItem) => {
        setSelectedPostId(postItem.id);
        setCommentInput("");
    };

    const handleLikeToggle = (e, postId) => {
        e.stopPropagation();
        const myAccount = { id: "me", name: "나(User)", isFollowing: false };

        setPosts((prevPosts) =>
            prevPosts.map((postItem) => {
                if (postItem.id === postId) {
                    const hasLiked = postItem.likedUsers.some(
                        (u) => u.id === "me"
                    );
                    return {
                        ...postItem,
                        likedUsers: hasLiked
                            ? postItem.likedUsers.filter((u) => u.id !== "me")
                            : [...postItem.likedUsers, myAccount],
                    };
                }
                return postItem;
            })
        );
    };

    const openLikeModal = (e, postId) => {
        e.stopPropagation();
        setLikeModalPostId(postId);
    };

    const handleFollowToggle = async (friendId) => {
        try {
            await api.post(`/follows/${friendId}`);

            setFriends((prev) =>
                prev.map((friend) =>
                    friend.id === friendId
                        ? { ...friend, isFollowing: !friend.isFollowing }
                        : friend
                )
            );
        } catch (err) {
            console.error("팔로우 처리 실패", err);
        }
    };

    const handleLikeUserFollow = (userId) => {
        setPosts((prevPosts) =>
            prevPosts.map((postItem) => ({
                ...postItem,
                likedUsers: postItem.likedUsers.map((user) =>
                    user.id === userId
                        ? { ...user, isFollowing: !user.isFollowing }
                        : user
                ),
            }))
        );
    };

    const handleClearSearchHistory = () => {
        setSearchHistory([]);
    };

    const handleRemoveSearchItem = (targetIndex) => {
        setSearchHistory((prev) =>
            prev.filter((_, index) => index !== targetIndex)
        );
    };

    const handleBlockUser = async () => {
        const targetPost = posts.find((post) => post.id === reportModalPostId);
        if (!targetPost) return;
        // 백엔드 주소 구조인 post.author.id 혹은 post.author.username을 타겟으로 잡아야 합니다.
        const targetUserId = targetPost.author?.id;

        try {
            // 서버에 차단 요청
            await api.post(`/users/block/${targetUserId}`);

            // 차단 리스트에 추가하고
            setBlockedUsers((prev) => [...prev, targetPost.author?.username]);
            setReportModalPostId(null);

            // 차단된 유저의 게시글은 현재 피드(posts) 목록에서 즉시 보이지 않도록 제외(필터)
            setPosts((prev) =>
                prev.filter((post) => post.author?.id !== targetUserId)
            );

            if (selectedPostId === targetPost.id) {
                setSelectedPostId(null); // 만약 상세보기 중이었다면 닫기
            }
            alert("유저를 차단했습니다.");
        } catch (err) {
            console.error("유저 차단 실패:", err);
        }
    };

    // 부모 댓글 등록
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentInput.trim() || !selectedPostId) return;

        // const newComment = {
        //     id: Date.now(),
        //     user: "나(User)",
        //     time: "방금 전",
        //     text: commentInput,
        //     likes: 0,
        //     isMine: true,
        //     replies: [],
        // };

        try {
            const res = await api.post(`/comment`, {
                postId: posts.id,
                content: commentInput,
                parentId: posts.id,
            });

            const savedComment = res.data;

            setPosts((prevPosts) =>
                prevPosts.map((postItem) => {
                    if (postItem.id === selectedPost) {
                        return {
                            ...postItem,
                            comment: [
                                savedComment,
                                ...(postItem.comments || []),
                            ],
                            commentCount: (postItem.commentCount || 0) + 1,
                        };
                    }
                    return postItem;
                })
            );
            setCommentInput("");
        } catch (err) {
            console.error("댓글 등록 실패: ", err);
            alert("댓글을 등록하지 않았습니다.");
        }
    };

    // 대댓글 등록
    const handleReplySubmit = async (e, commentId) => {
        e.preventDefault();
        if (!commentInput.trim() || !selectedPostId) return;

        const newReply = {
            id: Date.now(),
            user: "나(User)",
            time: "방금 전",
            text: commentInput,
            likes: 0,
            isMine: true,
        };

        try {
            const res = await api.post(
                `/comments`,
                {
                    content: commentInput,
                    postId: posts.id,
                    parentId: commentId,
                } // 백엔드 필드명에 맞추기
            );

            // 서버가 디비에 저장하고 리턴해 준 진짜 대댓글 객체
            const savedReply = res.data;
            console.log("timeline : savedReply", res.data);

            setPosts((prevPosts) =>
                prevPosts.map((postItem) => {
                    if (postItem.id !== selectedPostId) return postItem;

                    return {
                        ...postItem,
                        // 게시글의 전체 댓글 수를 1 올려줍니다.
                        commentCount: (postItem.commentCount || 0) + 1,
                    }
                })
            );
        } catch(err){
            console.log("대댓글 관련 오류");
        }
    }
                

    const handleFollowToggle = (id) => {
        setFriends((prev) =>
            prev.map((friend) =>
                friend.id === id
                    ? { ...friend, isFollowing: !friend.isFollowing }
                    : friend
            )
        );
    };

    const handleAddSearchHistory = (userName) => {
        setSearchHistory((prev) => {
            const filtered = prev.filter((item) => item !== userName);
            return [userName, ...filtered];
        });
    };
    const handleLikeUserFollow = (userId) => {
        setPosts((prevPosts) =>
            prevPosts.map((postItem) => ({
                ...postItem,
                likedUsers: postItem.likedUsers.map((user) =>
                    user.id === userId
                        ? { ...user, isFollowing: !user.isFollowing }
                        : user
                ),
            }))
        );
    };

    const handleClearSearchHistory = () => {
        setSearchHistory([]);
    };

    const handleRemoveSearchItem = (targetIndex) => {
        setSearchHistory((prev) =>
            prev.filter((_, index) => index !== targetIndex)
        );
    };

    const handleBlockUser = () => {
        const targetPost = posts.find((post) => post.id === reportModalPostId);
        if (!targetPost) return;

        setBlockedUsers((prev) => [...prev, targetPost.username]);
        setReportModalPostId(null);

        if (selectedPostId === targetPost.id) {
            setSelectedPostId(null);
        }
    };

    // 부모 댓글 등록
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!commentInput.trim() || !selectedPostId) return;

        const newComment = {
            id: Date.now(),
            user: "나(User)",
            time: "방금 전",
            text: commentInput,
            likes: 0,
            isMine: true,
            replies: [],
        };

        setPosts((prevPosts) =>
            prevPosts.map((postItem) => {
                if (postItem.id === selectedPostId) {
                    return {
                        ...postItem,
                        comments: [newComment, ...postItem.comments],
                    };
                }
                return postItem;
            })
        );
        setCommentInput("");
    };
    const followingPosts = posts.filter(
        (post) =>
            friends.some(
                (friend) =>
                    friend.isFollowing && friend.username === post.username
            ) && !blockedUsers.includes(post.username)
    );

    // 대댓글 등록
    const handleReplySubmit = (e, commentId) => {
        e.preventDefault();
        if (!commentInput.trim() || !selectedPostId) return;

        const newReply = {
            id: Date.now(),
            user: "나(User)",
            time: "방금 전",
            text: commentInput,
            likes: 0,
            isMine: true,
        };

        setPosts((prevPosts) =>
            prevPosts.map((postItem) => {
                if (postItem.id === selectedPostId) {
                    return {
                        ...postItem,
                        comments: postItem.comments.map((comment) => {
                            if (comment.id === commentId) {
                                return {
                                    ...comment,
                                    // 기존 대댓글 배열 뒤(또는 앞)에 서버가 준 새 대댓글 추가
                                    replies: [
                                        ...(comment.replies || []),
                                        savedReply,
                                    ],
                                };
                            }
                            return comment;
                        }),
                    };
                })
            );
            setCommentInput("");
        } catch (err) {
            console.error("대댓글 등록 실패:", err);
            alert("답글을 등록하지 못했습니다.");
        }
    };

    // 댓글 및 대댓글 삭제 기능 완전 정상화
    const handleCommentDelete = async (
        commentId,
        isReply = false,
        parentCommentId = null
    ) => {
        setPosts((prevPosts) =>
            prevPosts.map((postItem) => {
                if (postItem.id !== selectedPostId) return postItem;

                const updatedComments = postItem.comments.map((comment) => {
                    if (isReply && comment.id === parentCommentId) {
                        return {
                            ...comment,
                            replies: (comment.replies || []).filter(
                                (reply) => reply.id !== commentId
                            ),
                        };
                    }
                    return comment;
                });

                return {
                    ...postItem,
                    comments: isReply
                        ? updatedComments
                        : updatedComments.filter(
                              (comment) => comment.id !== commentId
                          ),
                };
            })
        );
    };

    return (
        <div className="timeline">
            <div className="timeline-top">
                <p
                    className={activeTab === "suggest" ? "active" : ""}
                    onClick={() => setActiveTab("suggest")}
                    style={{ cursor: "pointer" }}
                >
                    추천
                </p>
                <span>|</span>
                <p
                    className={activeTab === "following" ? "active" : ""}
                    onClick={() => setActiveTab("following")}
                    style={{ cursor: "pointer" }}
                >
                    팔로잉
                </p>
            </div>

            <div className="timeline-wrapper">
                <div className="timeline-posts">
                    {activeTab === "following" && visiblePosts.length === 0 ? (
                        <div className="empty-following">
                            <h3>팔로우한 계정이 없습니다.</h3>
                            <p>관심있는 유저를 팔로우해보세요.</p>
                        </div>
                    ) : (
                        visiblePosts.map((item) => (
                            <div
                                key={item?.id}
                                className="post"
                                onClick={() => handlePostClick(item)}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="post-top2">
                                    <div className="post-profile">
                                        <img
                                            src={item?.author?.profileImageUrl}
                                            alt="userProfileImage"
                                        />
                                        <div>
                                            <h4>{item?.author?.username}</h4>
                                            <span>{item?.timeAgo}</span>
                                        </div>
                                    </div>
                                    <div
                                        className="more"
                                        onClick={(e) =>
                                            openReportModal(e, item?.id)
                                        }
                                    >
                                        ⋯
                                    </div>
                                </div>

                                <div className="post-center">
                                    <p>{item?.content}</p>
                                    <div
                                        className={`post-images ${
                                            item?.uploadedImageUrls &&
                                            item?.uploadedImageUrls.length === 1
                                                ? "one"
                                                : item?.uploadedImageUrls &&
                                                    item?.uploadedImageUrls
                                                        .length === 2
                                                  ? "two"
                                                  : ""
                                        }`}
                                    >
                                        {item?.uploadedImageUrls &&
                                            item?.uploadedImageUrls
                                                .slice(0, 3)
                                                .map((imgSrc, index) => {
                                                    if (
                                                        index === 2 &&
                                                        item.uploadedImageUrls
                                                            .length > 3
                                                    ) {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="last-image"
                                                            >
                                                                <img
                                                                    src={imgSrc}
                                                                    alt=""
                                                                />
                                                                <span>
                                                                    +
                                                                    {item
                                                                        .uploadedImageUrls
                                                                        .length -
                                                                        3}
                                                                </span>
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                        <img
                                                            key={index}
                                                            src={imgSrc}
                                                            alt={`image idx:${index}`}
                                                        />
                                                    );
                                                })}
                                    </div>
                                </div>

                                <div className="post-bottom">
                                    <div
                                        className="post-stat"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <img
                                            src={HeartIcon}
                                            alt="좋아요"
                                            className={`stat-icon ${checkIfILiked(item) ? "liked" : ""}`}
                                            onClick={(e) =>
                                                handleLikeToggle(e, item.id)
                                            }
                                            style={{ cursor: "pointer" }}
                                        />
                                        <span
                                            onClick={(e) =>
                                                openLikeModal(e, item.id)
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            {(
                                                item.likeCount ??
                                                item.likedUsers.length
                                            ).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="post-stat">
                                        <img
                                            src={CommentIcon}
                                            alt="댓글"
                                            className="stat-icon"
                                        />
                                        {getCommentsCount(item)}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    {hasNextPage && (
                        <div ref={observerTarget} className="scroll-observer">
                            {isLoading ? "게시글을 더 불러오는 중..." : ""}
                        </div>
                    )}
                    {(activeTab === "recommend"
                        ? visiblePosts
                        : followingPosts
                    ).map((item) => (
                        <div
                            key={item.id}
                            className="post"
                            onClick={() => handlePostClick(item)}
                            style={{ cursor: "pointer" }}
                        >
                            <div className="post-top2">
                                <div className="post-profile">
                                    <img src={profile} alt="" />
                                    <div>
                                        <h4>{item.username}</h4>
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                                <div
                                    className="more"
                                    onClick={(e) => openReportModal(e, item.id)}
                                >
                                    ⋯
                                </div>
                            </div>

                            <div className="post-center">
                                <p>{item.content}</p>
                                <div
                                    className={`post-images ${
                                        item.images && item.images.length === 1
                                            ? "one"
                                            : item.images &&
                                                item.images.length === 2
                                              ? "two"
                                              : ""
                                    }`}
                                >
                                    {item.images &&
                                        item.images
                                            .slice(0, 3)
                                            .map((imgSrc, index) => {
                                                if (
                                                    index === 2 &&
                                                    item.images.length > 3
                                                ) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="last-image"
                                                        >
                                                            <img
                                                                src={imgSrc}
                                                                alt=""
                                                            />
                                                            <span>
                                                                +
                                                                {item.images
                                                                    .length - 3}
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                                return (
                                                    <img
                                                        key={index}
                                                        src={imgSrc}
                                                        alt=""
                                                    />
                                                );
                                            })}
                                </div>
                            </div>

                            <div className="post-bottom">
                                <div
                                    className="post-stat"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={HeartIcon}
                                        alt="좋아요"
                                        className={`stat-icon ${checkIfILiked(item) ? "liked" : ""}`}
                                        onClick={(e) =>
                                            handleLikeToggle(e, item.id)
                                        }
                                        style={{ cursor: "pointer" }}
                                    />
                                    <span
                                        onClick={(e) =>
                                            openLikeModal(e, item.id)
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        {item.likedUsers.length.toLocaleString()}
                                    </span>
                                </div>

                                <div className="post-stat">
                                    <img
                                        src={CommentIcon}
                                        alt="댓글"
                                        className="stat-icon"
                                    />
                                    {getCommentsCount(item)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="timeline-right">
                    <div
                        className="search-card"
                        onClick={() => setIsSearchModalOpen(true)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="search-box">
                            <input type="text" placeholder="검색" readOnly />
                        </div>

                        <div
                            className="chat-box"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="chat-top">
                                <div></div>
                                <span
                                    style={{ cursor: "pointer" }}
                                    onClick={handleClearSearchHistory}
                                >
                                    모두지우기
                                </span>
                            </div>

                            {searchHistory.map((item, index) => (
                                <div key={index} className="friend-user">
                                    <div className="friend-left">
                                        <img src={profile} alt="" />
                                        <p>{item}</p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleRemoveSearchItem(index)
                                        }
                                        className="search-delete-btn"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="friend-box">
                        <h3>추천 친구</h3>
                        {friends.map((friend) => (
                            <div key={friend?.id} className="friend-user">
                                <div className="friend-left">
                                    <img
                                        src={friend?.profileImageUrl}
                                        alt="friend profileImg"
                                    />
                                    <p>{friend?.username}</p>
                                </div>
                                <button
                                    onClick={() =>
                                        handleFollowToggle(friend?.id)
                                    }
                                    className={
                                        friend?.isFollowing
                            <div key={friend.id} className="friend-user">
                                <div className="friend-left">
                                    <img src={profile} alt="" />
                                    <p>{friend.name}</p>
                                </div>
                                <button
                                    onClick={() =>
                                        handleFollowToggle(friend.id)
                                    }
                                    className={
                                        friend.isFollowing
                                            ? "following-btn"
                                            : ""
                                    }
                                >
                                    {friend.isFollowing ? "팔로잉" : "팔로우"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
                onUserSelect={handleAddSearchHistory}
                friends={friends}
                onFollowToggle={handleFollowToggle}
            {/* 게시물 상세 + 댓글 레이아웃 모달 */}
            {selectedPost && (
                <div
                    className="modal-overlay"
                    onClick={() => {
                        setSelectedPostId(null);
                        setReplyViewCommentId(null);
                    }}
                >
                    <div
                        className="modal-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-left">
                            <div className="post-top2">
                                <div className="post-profile">
                                    <img src={profile} alt="" />
                                    <div>
                                        <h4>{selectedPost.username}</h4>
                                        <span>{selectedPost.time}</span>
                                    </div>
                                </div>
                                <div
                                    className="more"
                                    onClick={(e) =>
                                        openReportModal(e, selectedPost?.id)
                                    }
                                >
                                    ⋯
                                </div>
                            </div>

                            <div className="post-center">
                                <p className="modal-detail-text">
                                    {selectedPost?.content}
                                </p>
                                <div className="modal-image-grid">
                                    {selectedPost?.uploadedImageUrls &&
                                        selectedPost?.uploadedImageUrls.map(
                                    {selectedPost.content}
                                </p>
                                <div className="modal-image-grid">
                                    {selectedPost.images &&
                                        selectedPost.images.map(
                                            (imgSrc, idx) => (
                                                <div
                                                    key={idx}
                                                    className="modal-image-item"
                                                >
                                                    <img
                                                        src={imgSrc}
                                                        alt={`uploadImageUrls : ${idx} - uploadedImg`}
                                                    />
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>

                            <div className="post-bottom">
                                <div className="post-stat">
                                    <img
                                        src={HeartIcon}
                                        alt="좋아요"
                                        className={`heart-icon ${checkIfILiked(selectedPost) ? "liked" : ""}`}
                                        onClick={(e) =>
                                            handleLikeToggle(e, selectedPost.id)
                                        }
                                        style={{ cursor: "pointer" }}
                                    />
                                    <span
                                        onClick={(e) =>
                                            openLikeModal(e, selectedPost?.id)
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        {(
                                            selectedPost.likeCount ??
                                            selectedPost.likedUsers.length
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                <div className="post-stat">
                                    <img
                                        src={CommentIcon}
                                        alt="댓글"
                                        className="stat-icon"
                                    />
                                    <span>
                                        {getCommentsCount(selectedPost)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-right">
                            {!replyViewCommentId ? (
                                <>
                                    <h3 className="modal-comments-title">
                                        댓글
                                    </h3>

                                    <form
                                        className={`modal-comment-write ${
                                            commentInput.trim()
                                                ? "has-text"
                                                : ""
                                        }`}
                                        onSubmit={handleCommentSubmit}
                                    >
                                        <textarea
                                            value={commentInput}
                                            onChange={(e) =>
                                                setCommentInput(e.target.value)
                                            }
                                            placeholder="댓글을 입력하세요."
                                        />
                                        <div className="modal-comment-btns">
                                            <button
                                                type="button"
                                                className="btn-cancel"
                                                onClick={() =>
                                                    setCommentInput("")
                                                }
                                            >
                                                취소
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn-submit"
                                            >
                                                등록
                                            </button>
                                        </div>
                                    </form>

                                    <div className="comment-scroll-area">
                                        <div className="modal-comments-count">
                                            댓글{" "}
                                            {getCommentsCount(selectedPost)}
                                        </div>

                                        <div className="modal-comment-list">
                                            {selectedPost?.comments &&
                                                selectedPost.comments.map(
                                                    (comment) => (
                                                        <div
                                                            key={comment.id}
                                                            className="modal-comment-item"
                                                        >
                                                            <img
                                                                src={profile}
                                                                alt=""
                                                            />
                                                            <div className="comment-body">
                                                                <div className="comment-user-info">
                                                                    <h5>
                                                                        {
                                                                            comment.user
                                                                        }
                                                                    </h5>
                                                                    <span>
                                                                        {
                                                                            comment.time
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <p className="modal-comment-text">
                                                                    {
                                                                        comment.text
                                                                    }
                                                                </p>
                                                                <div className="comment-actions">
                                                                    <div
                                                                        className="post-stat"
                                                                        style={{
                                                                            display:
                                                                                "inline-flex",
                                                                            marginRight:
                                                                                "10px",
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                HeartIcon
                                                                            }
                                                                            alt="좋아요"
                                                                            className="stat-icon"
                                                                        />
                                                                        <span>
                                                                            {comment.likes ||
                                                                                0}
                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        className="post-stat"
                                                                        style={{
                                                                            display:
                                                                                "inline-flex",
                                                                            cursor: "pointer",
                                                                        }}
                                                                        onClick={() =>
                                                                            setReplyViewCommentId(
                                                                                comment.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={
                                                                                CommentIcon
                                                                            }
                                                                            alt="답글"
                                                                            className="stat-icon"
                                                                        />
                                                                        <span>
                                                                            {comment.replies &&
                                                                            comment
                                                                                .replies
                                                                                .length >
                                                                                0
                                                                                ? comment
                                                                                      .replies
                                                                                      .length
                                                                                : 0}
                                                                        </span>
                                                                    </div>

                                                                    {/* [수정] 내가 쓴 댓글(isMine이 true)일 때만 삭제 버튼이 렌더링되도록 수정 */}
                                                                    {comment.isMine && (
                                                                        <span
                                                                            onClick={() =>
                                                                                handleCommentDelete(
                                                                                    comment.id,
                                                                                    false
                                                                                )
                                                                            }
                                                                            style={{
                                                                                cursor: "pointer",
                                                                                color: "red",
                                                                                marginLeft:
                                                                                    "10px",
                                                                                fontSize:
                                                                                    "12px",
                                                                            }}
                                                                        >
                                                                            삭제
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        className="reply-page-header"
                                        onClick={() =>
                                            setReplyViewCommentId(null)
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        ← 전체 댓글 보기
                                    </div>

                                    {selectedPost.comments &&
                                        selectedPost.comments
                                            .filter(
                                                (c) =>
                                                    c.id === replyViewCommentId
                                            )
                                            .map((comment) => (
                                                <div
                                                    key={comment.id}
                                                    className="reply-parent-card"
                                                >
                                                    <img src={profile} alt="" />
                                                    <div className="comment-body">
                                                        <div className="comment-user-info">
                                                            <h5>
                                                                {comment.user}
                                                            </h5>
                                                            <span>
                                                                {comment.time}
                                                            </span>
                                                        </div>
                                                        <p className="modal-comment-text">
                                                            {comment.text}
                                                        </p>
                                                        <div
                                                            className="comment-actions"
                                                            style={{
                                                                marginTop:
                                                                    "5px",
                                                            }}
                                                        >
                                                            <div
                                                                className="post-stat"
                                                                style={{
                                                                    display:
                                                                        "inline-flex",
                                                                }}
                                                            >
                                                                <img
                                                                    src={
                                                                        HeartIcon
                                                                    }
                                                                    alt="좋아요"
                                                                    className="stat-icon"
                                                                />
                                                                <span>
                                                                    {comment.likes ||
                                                                        0}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                    <form
                                        className={`modal-comment-write ${
                                            commentInput.trim()
                                                ? "has-text"
                                                : ""
                                        }`}
                                        onSubmit={(e) =>
                                            handleReplySubmit(
                                                e,
                                                replyViewCommentId
                                            )
                                        }
                                    >
                                        <textarea
                                            value={commentInput}
                                            onChange={(e) =>
                                                setCommentInput(e.target.value)
                                            }
                                            placeholder="답글을 입력하세요."
                                        />
                                        <div className="modal-comment-btns">
                                            <button
                                                type="button"
                                                className="btn-cancel"
                                                onClick={() =>
                                                    setCommentInput("")
                                                }
                                            >
                                                취소
                                            </button>
                                            <button
                                                type="submit"
                                                className="btn-submit"
                                            >
                                                등록
                                            </button>
                                        </div>
                                    </form>

                                    <div className="comment-scroll-area">
                                        <div className="modal-comments-count">
                                            전체 답글{" "}
                                            {selectedPost.comments.find(
                                                (c) =>
                                                    c.id === replyViewCommentId
                                            )?.replies?.length || 0}
                                        </div>

                                        <div className="modal-comment-list">
                                            {selectedPost.comments
                                                .find(
                                                    (c) =>
                                                        c.id ===
                                                        replyViewCommentId
                                                )
                                                ?.replies?.map((reply) => (
                                                    <div
                                                        key={reply.id}
                                                        className="modal-comment-item"
                                                    >
                                                        <img
                                                            src={profile}
                                                            alt=""
                                                        />
                                                        <div className="comment-body">
                                                            <div className="comment-user-info">
                                                                <h5>
                                                                    {reply.user}
                                                                </h5>
                                                                <span>
                                                                    {reply.time}
                                                                </span>
                                                            </div>
                                                            <p className="modal-comment-text">
                                                                {reply.text}
                                                            </p>
                                                            <div className="comment-actions">
                                                                <div
                                                                    className="post-stat"
                                                                    style={{
                                                                        display:
                                                                            "inline-flex",
                                                                        marginRight:
                                                                            "10px",
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={
                                                                            HeartIcon
                                                                        }
                                                                        alt="좋아요"
                                                                        className="stat-icon"
                                                                    />
                                                                    <span>
                                                                        {reply.likes ||
                                                                            0}
                                                                    </span>
                                                                </div>

                                                                {/* [수정] 내가 쓴 답글(isMine이 true)일 때만 삭제 버튼이 렌더링되도록 수정 */}
                                                                {reply.isMine && (
                                                                    <span
                                                                        onClick={() =>
                                                                            handleCommentDelete(
                                                                                reply.id,
                                                                                true,
                                                                                replyViewCommentId
                                                                            )
                                                                        }
                                                                        style={{
                                                                            cursor: "pointer",
                                                                            color: "red",
                                                                            fontSize:
                                                                                "12px",
                                                                        }}
                                                                    >
                                                                        삭제
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 좋아요 명단 모달 */}
            {likeModalPostId && likeTargetPost && (
                <div
                    className="like-modal-overlay"
                    onClick={() => setLikeModalPostId(null)}
                >
                    <div
                        className="like-modal-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="like-modal-header">
                            <h3>좋아요</h3>
                            <button
                                className="like-modal-close-btn"
                                onClick={() => setLikeModalPostId(null)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="like-modal-count-box">
                            <img
                                src={HeartIcon}
                                alt="좋아요"
                                className="stat-icon"
                            />
                            {(
                                likeTargetPost.likeCount ??
                                likeTargetPost.likedUsers.length
                            ).toLocaleString()}
                            {likeTargetPost.likedUsers.length.toLocaleString()}

            {/* 신고/차단 관련 모달 */}
            {reportModalPostId && (
                <div
                    className="report-modal-overlay"
                    onClick={() => {
                        setReportModalPostId(null);
                        setShowBlockConfirm(false);
                        setShowReportReasons(false);
                        setSelectedReason("");
                    }}
                >
                    <div
                        className="report-modal-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {showBlockConfirm ? (
                            <>
                                <h3>사용자를 차단할까요?</h3>
                                <p className="report-sub-text">
                                    차단 시 해당 사용자의 게시물이 더 이상
                                    보이지 않습니다.
                                </p>
                                <div className="report-btn-group">
                                    <button
                                        className="btn-report-action"
                                        onClick={handleBlockUser}
                                    >
                                        차단
                                    </button>
                                    <button
                                        className="btn-report-cancel"
                                        onClick={() =>
                                            setShowBlockConfirm(false)
                                        }
                                    >
                                        취소
                                    </button>
                                </div>
                            </>
                        ) : showReportReasons ? (
                            <>
                                <div className="report-icon-wrap">⚠️</div>
                                <h3>신고하기</h3>
                                <p className="report-sub-text">
                                    사유를 선택하시면 신고 처리가 완료됩니다.
                                </p>
                                <div className="report-options-list">
                                    {REPORT_REASONS.map((reason) => (
                                        <label
                                            key={reason}
                                            className={`report-option-item ${
                                                selectedReason === reason
                                                    ? "selected"
                                                    : ""
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="reportReason"
                                                value={reason}
                                                checked={
                                                    selectedReason === reason
                                                }
                                                onChange={(e) =>
                                                    setSelectedReason(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <span>{reason}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="report-btn-group">
                                    <button
                                        className="btn-report-action"
                                        disabled={!selectedReason}
                                        onClick={() => {
                                            alert(
                                                `[${selectedReason}] 사유로 신고되었습니다.`
                                            );
                                            setReportModalPostId(null);
                                            setShowReportReasons(false);
                                            setSelectedReason("");
                                        }}
                                    >
                                        신고하기
                                    </button>
                                    <button
                                        className="btn-report-cancel"
                                        onClick={() => {
                                            setShowReportReasons(false);
                                            setSelectedReason("");
                                        }}
                                    >
                                        이전으로
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3>게시물 관리</h3>
                                <div className="report-btn-group">
                                    <button
                                        className="btn-report-action"
                                        onClick={() =>
                                            setShowBlockConfirm(true)
                                        }
                                    >
                                        차단
                                    </button>
                                    <button
                                        className="btn-report-cancel"
                                        style={{
                                            backgroundColor: "var(--button-3)",
                                            color: "var(--white)",
                                        }}
                                        onClick={() =>
                                            setShowReportReasons(true)
                                        }
                                    >
                                        신고
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
