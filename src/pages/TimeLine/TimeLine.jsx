import { useState } from "react";
import profile from "../../assets/profile-icon.svg";
import post1 from "../../assets/riwoo.png";
import "./TimeLine.css";
import SearchModal from "../TimeLine/SearchModal";
import HeartIcon from "../../assets/heart-icon.svg";
import CommentIcon from "../../assets/comment-icon.svg";

const REPORT_REASONS = [
    "스팸 및 홍보성 콘텐츠",
    "음란물 또는 성적 콘텐츠",
    "혐오 발언 및 괴롭힘",
    "부적절한 내용 및 기타",
];

const INITIAL_FRIENDS = [
    {
        id: 1,
        name: "Jin라면먹고싶다",
        username: "Jin라면먹고싶다",
        isFollowing: true,
    },
    { id: 2, name: "으아내정신", username: "으아내정신", isFollowing: false },
    {
        id: 3,
        name: "성호어깨에치여사망",
        username: "성호어깨에치여사망",
        isFollowing: false,
    },
    {
        id: 4,
        name: "똥싸개",
        username: "똥싸개",
        isFollowing: true,
    },
    {
        id: 5,
        name: "주라미",
        username: "주라미",
        isFollowing: true,
    },
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
            "아 진짜 리우 너무 잘생겼어요 미친!! 게다가 오늘 보넥도 상 타서 진짜 너무 좋아요❤️",
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
            "컴백 너무 기대돼요! 투바투 이번 콘서트에는 티켓팅 성공해서 꼭 보러가고 싶어요! 다들 콘서트때 봬요~",
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
                text: "저도 꼭 가고 싶어요ㅠㅠ 티켓팅 파이팅!",
                likes: 5,
                isMine: true,
                replies: [],
            },
        ],
    },
    {
        id: 3,
        username: "주라미",
        time: "2분 전",
        content:
            "JIMIN I LOVE YOU SO MUCH",
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
                isMine: false,
                replies: [],
            },
        ],
    },
];

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

    const openReportModal = (e, postId) => {
        e.stopPropagation();
        setReportModalPostId(postId);
        setSelectedReason("");
        setShowBlockConfirm(false);
    };

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
                                    replies: [
                                        ...(comment.replies || []),
                                        newReply,
                                    ],
                                };
                            }
                            return comment;
                        }),
                    };
                }
                return postItem;
            })
        );
        setCommentInput("");
    };

    // 댓글 및 대댓글 삭제 기능 완전 정상화
    const handleCommentDelete = (
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
                    className={activeTab === "recommend" ? "active" : ""}
                    onClick={() => setActiveTab("recommend")}
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
            />

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
                                        openReportModal(e, selectedPost.id)
                                    }
                                >
                                    ⋯
                                </div>
                            </div>

                            <div className="post-center">
                                <p className="modal-detail-text">
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
                                                    <img src={imgSrc} alt="" />
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
                                            openLikeModal(e, selectedPost.id)
                                        }
                                        style={{ cursor: "pointer" }}
                                    >
                                        {selectedPost.likedUsers.length.toLocaleString()}
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
                                            {selectedPost.comments &&
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
                            {likeTargetPost.likedUsers.length.toLocaleString()}
                        </div>
                        <div className="like-public-text">
                            좋아요를 누른 모든 사용자가 공개됩니다.
                        </div>
                        <div className="like-user-list">
                            {likeTargetPost.likedUsers.map((user) => (
                                <div key={user.id} className="like-user-item">
                                    <div className="like-user-info">
                                        <img src={profile} alt="" />
                                        <p>{user.name}</p>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleLikeUserFollow(user.id)
                                        }
                                        className={
                                            user.isFollowing
                                                ? "status-following"
                                                : "status-follow"
                                        }
                                    >
                                        {user.isFollowing ? "팔로잉" : "팔로우"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

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
