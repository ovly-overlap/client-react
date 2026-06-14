import { useState } from "react";
import profile from "../assets/profile-icon.svg";
import post from "../assets/eye-icon.svg";
import "./TimeLine.css";

const REPORT_REASONS = [
  "욕설 / 비하",
  "음란물 / 성적 내용",
  "허위 정보 / 루머 유포",
  "도배 / 반복 게시글",
  "기타",
];

const INITIAL_FRIENDS = [
  {
    id: 1,
    name: "Jin라면먹고싶다",
    isFollowing: true,
  },
  {
    id: 2,
    name: "으아내정신",
    isFollowing: false,
  },
  {
    id: 3,
    name: "성호어깨에치여사망",
    isFollowing: false,
  },
];

const INITIAL_SEARCHES = ["망개떡", "우나기", "ChristmasTree"];

const INITIAL_LIKE_USERS = [
  { id: 1, name: "성호어깨에치여사망", isFollowing: true },
  { id: 2, name: "망개떡", isFollowing: false },
  { id: 3, name: "우나기", isFollowing: false },
  { id: 4, name: "ChristmasTree", isFollowing: false },
  { id: 5, name: "리우사랑단", isFollowing: false },
  { id: 6, name: "덕질은행복", isFollowing: false },
  { id: 7, name: "브넥최고", isFollowing: false },
  { id: 8, name: "성호팬", isFollowing: false },
  { id: 9, name: "성호팬", isFollowing: false },
  { id: 10, name: "성호팬", isFollowing: false },
  { id: 11, name: "성호팬", isFollowing: false },
  { id: 12, name: "성호팬", isFollowing: false },
  { id: 13, name: "성호팬", isFollowing: false },
  { id: 14, name: "성호팬", isFollowing: false },
  { id: 15, name: "성호팬", isFollowing: false },
  { id: 16, name: "성호팬", isFollowing: false },
];

const INITIAL_POSTS = [
  {
    id: 1,
    username: "링링",
    time: "2분 전",
    content:
      "아 진짜 리쿠 너무 잘생겼어요 미친!! 게다가 오늘 브넥도 상남자여서 진짜 너무 좋아요❤️",
    images: [post, post, post, post, post, post],
    likes: "7,654",
    commentsCount: 778,
    comments: [
      {
        id: 101,
        user: "으아내정신",
        time: "1시간 전",
        text: "I love you, riwoo my dear darling S2",
        likes: 1,
        replies: [],
      },
      {
        id: 102,
        user: "류류",
        time: "1일 전",
        text: "제발 리우 옷 손민수하고 싶다 저 왼쪽 사진",
        likes: 10000000,
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
    images: [post, post],
    likes: "12",
    commentsCount: 1,
    comments: [
      {
        id: 201,
        user: "망개떡",
        time: "30분 전",
        text: "저도 꼭 가고 싶어요ㅠㅠ 티케팅 파이팅!",
        likes: 5,
        replies: [],
      },
    ],
  },
  {
    id: 1,
    username: "링링",
    time: "2분 전",
    content:
      "아 진짜 리쿠 너무 잘생겼어요 미친!! 게다가 오늘 브넥도 상남자여서 진짜 너무 좋아요❤️",
    images: [post, post, post, post, post, post],
    likes: "7,654",
    commentsCount: 778,
    comments: [
      {
        id: 101,
        user: "으아내정신",
        time: "1시간 전",
        text: "I love you, riwoo my dear darling S2",
        likes: 1,
        replies: [],
      },
      {
        id: 102,
        user: "류류",
        time: "1일 전",
        text: "제발 리우 옷 손민수하고 싶다 저 왼쪽 사진",
        likes: 10000000,
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
    images: [post, post],
    likes: "12",
    commentsCount: 1,
    comments: [
      {
        id: 201,
        user: "망개떡",
        time: "30분 전",
        text: "저도 꼭 가고 싶어요ㅠㅠ 티케팅 파이팅!",
        likes: 5,
        replies: [],
      },
    ],
  },
];

export default function TimeLine() {
  const [posts, setPosts] = useState(INITIAL_POSTS);

  const [activeTab, setActiveTab] = useState("recommend");

  const [friends, setFriends] = useState(INITIAL_FRIENDS);

  const [searchHistory, setSearchHistory] = useState(INITIAL_SEARCHES);

  const [blockedUsers, setBlockedUsers] = useState([]);

  const [likeUsers, setLikeUsers] = useState(INITIAL_LIKE_USERS);

  const [selectedPostId, setSelectedPostId] = useState(null);

  const [likeModalPostId, setLikeModalPostId] = useState(null);

  const [reportModalPostId, setReportModalPostId] = useState(null);

  const [selectedReason, setSelectedReason] = useState("");

  const [isReportSubmitted, setIsReportSubmitted] = useState(false);

  const [commentInput, setCommentInput] = useState("");

  const [showBlockConfirm, setShowBlockConfirm] = useState(false);

  const [replyViewCommentId, setReplyViewCommentId] = useState(null);

  const selectedPost = posts.find((p) => p.id === selectedPostId);

  const likeTargetPost = posts.find((p) => p.id === likeModalPostId);

  const followingNames = friends
    .filter((friend) => friend.isFollowing)
    .map((friend) => friend.name);

  const REPORT_REASONS = [
    "스팸 및 홍보성 콘텐츠",
    "음란물 또는 성적 콘텐츠",
    "혐오 발언 및 괴롭힘",
    "부적절한 내용 및 기타",
  ];

  const visiblePosts =
    activeTab === "recommend"
      ? posts.filter((post) => !blockedUsers.includes(post.username))
      : posts.filter(
          (post) =>
            followingNames.includes(post.username) &&
            !blockedUsers.includes(post.username)
        );

  const handlePostClick = (postItem) => {
    setSelectedPostId(postItem.id);
    setCommentInput("");
  };

  const openLikeModal = (e, postId) => {
    e.stopPropagation();
    setLikeModalPostId(postId);
  };

  const openReportModal = (e, postId) => {
    e.stopPropagation();
    setReportModalPostId(postId);
    setSelectedReason("");
    setIsReportSubmitted(false);
    setShowBlockConfirm(false);
  };

  const handleReportSubmit = () => {
    if (!selectedReason) return;
    setIsReportSubmitted(true);
  };

  const handleFollowToggle = (name) => {
    setFriends((prev) =>
      prev.map((friend) =>
        friend.name === name
          ? {
              ...friend,
              isFollowing: !friend.isFollowing,
            }
          : friend
      )
    );
  };

  const handleLikeUserFollow = (userId) => {
    setLikeUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              isFollowing: !user.isFollowing,
            }
          : user
      )
    );
  };

  const handleClearSearchHistory = () => {
    setSearchHistory([]);
  };

  const handleRemoveSearchItem = (name) => {
    setSearchHistory((prev) => prev.filter((item) => item !== name));
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

    setPosts(
      posts.map((postItem) => {
        if (postItem.id === selectedPostId) {
          return {
            ...postItem,
            commentsCount: postItem.commentsCount + 1,
            comments: [newComment, ...postItem.comments],
          };
        }

        return postItem;
      })
    );

    setCommentInput("");
  };

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

    setPosts(
      posts.map((postItem) => {
        if (postItem.id === selectedPostId) {
          return {
            ...postItem,
            commentsCount: postItem.commentsCount + 1,
            comments: postItem.comments.map((comment) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  replies: [...comment.replies, newReply],
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

  const handleCommentDelete = (
    commentId,
    isReply = false,
    parentCommentId = null
  ) => {
    setPosts(
      posts.map((postItem) => {
        if (postItem.id !== selectedPostId) return postItem;

        let updatedComments = [...postItem.comments];

        if (isReply) {
          updatedComments = updatedComments.map((comment) => {
            if (comment.id === parentCommentId) {
              return {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== commentId
                ),
              };
            }

            return comment;
          });
        } else {
          updatedComments = updatedComments.filter(
            (comment) => comment.id !== commentId
          );
        }

        return {
          ...postItem,
          commentsCount: Math.max(0, postItem.commentsCount - 1),
          comments: updatedComments,
        };
      })
    );

    if (!isReply && commentId === activeReplyCommentId) {
      setActiveReplyCommentId(null);
    }
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
          {activeTab === "following" && visiblePosts.length === 0 ? (
            <div className="empty-following">
              <h3>팔로우한 계정이 없습니다.</h3>
              <p>관심있는 유저를 팔로우해보세요.</p>
            </div>
          ) : (
            visiblePosts.map((item) => (
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
                      item.images.length === 2 ? "two" : ""
                    }`}
                  >
                    {item.images.slice(0, 3).map((imgSrc, index) => {
                      if (index === 2 && item.images.length > 3) {
                        return (
                          <div key={index} className="last-image">
                            <img src={imgSrc} alt="" />
                            <span>+{item.images.length - 3}</span>
                          </div>
                        );
                      }

                      return <img key={index} src={imgSrc} alt="" />;
                    })}
                  </div>
                </div>

                <div className="post-bottom">
                  <div
                    onClick={(e) => openLikeModal(e, item.id)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    💜 {item.likes}
                  </div>

                  <div>💬 {item.commentsCount}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="timeline-right">
          <div className="search-card">
            <div className="search-box">
              <input type="text" placeholder="검색" />
            </div>

            <div className="chat-box">
              <div className="chat-top">
                <span>최근 검색어</span>

                <span
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={handleClearSearchHistory}
                >
                  모두지우기
                </span>
              </div>

              {searchHistory.map((item, index) => (
                <div key={index} className="chat-user">
                  <div className="chat-left">
                    <img src={profile} alt="" />
                    <p>{item}</p>
                  </div>

                  <span
                    onClick={() => handleRemoveSearchItem(item)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    x
                  </span>
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
                  onClick={() => handleFollowToggle(friend.name)}
                  className={friend.isFollowing ? "following-btn" : ""}
                >
                  {friend.isFollowing ? "팔로잉" : "팔로우"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedPost && (
        <div
          className="modal-overlay"
          onClick={() => {
            setSelectedPostId(null);
            setReplyViewCommentId(null);
          }}
        >
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
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
                  onClick={(e) => openReportModal(e, selectedPost.id)}
                >
                  ⋯
                </div>
              </div>

              <div className="post-center">
                <p className="modal-detail-text">{selectedPost.content}</p>

                <div className="modal-image-grid">
                  {selectedPost.images.map((imgSrc, idx) => (
                    <div key={idx} className="modal-image-item">
                      <img src={imgSrc} alt="" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="post-bottom">
                <div
                  onClick={(e) => openLikeModal(e, selectedPost.id)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  💜 {selectedPost.likes}
                </div>

                <div>💬 {selectedPost.commentsCount}</div>
              </div>
            </div>

            <div className="modal-right">
              {!replyViewCommentId ? (
                <>
                  <h3 className="modal-comments-title">댓글</h3>

                  <form
                    className={`modal-comment-write ${
                      commentInput.trim() ? "has-text" : ""
                    }`}
                    onSubmit={handleCommentSubmit}
                  >
                    <textarea
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="댓글을 입력하세요."
                    />

                    <div className="modal-comment-btns">
                      <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => setCommentInput("")}
                      >
                        취소
                      </button>

                      <button type="submit" className="btn-submit">
                        등록
                      </button>
                    </div>
                  </form>

                  <div className="modal-comments-count">
                    댓글 {selectedPost.commentsCount}
                  </div>

                  <div className="modal-comment-list">
                    {selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="modal-comment-item">
                        <img src={profile} alt="" />

                        <div className="comment-body">
                          <div className="comment-user-info">
                            <h5>{comment.user}</h5>
                            <span>{comment.time}</span>
                          </div>

                          <p>{comment.text}</p>

                          <div className="comment-actions">
                            💜 {comment.likes}
                            <span
                              onClick={() => setReplyViewCommentId(comment.id)}
                            >
                              답글
                              {comment.replies.length > 0 &&
                                ` ${comment.replies.length}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="reply-page-header"
                    onClick={() => setReplyViewCommentId(null)}
                  >
                    ← 전체 댓글 보기
                  </div>

                  {selectedPost.comments
                    .filter((c) => c.id === replyViewCommentId)
                    .map((comment) => (
                      <div key={comment.id} className="reply-parent-card">
                        <img src={profile} alt="" />

                        <div className="comment-body">
                          <div className="comment-user-info">
                            <h5>{comment.user}</h5>
                            <span>{comment.time}</span>
                          </div>

                          <p>{comment.text}</p>
                        </div>
                      </div>
                    ))}

                  <form
                    className={`modal-comment-write ${
                      commentInput.trim() ? "has-text" : ""
                    }`}
                    onSubmit={(e) => handleReplySubmit(e, replyViewCommentId)}
                  >
                    <textarea
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="답글을 입력하세요."
                    />

                    <div className="modal-comment-btns">
                      <button
                        type="button"
                        className="btn-cancel"
                        onClick={() => setCommentInput("")}
                      >
                        취소
                      </button>

                      <button type="submit" className="btn-submit">
                        등록
                      </button>
                    </div>
                  </form>

                  <div className="modal-comments-count">
                    전체 답글
                    {
                      selectedPost.comments.find(
                        (c) => c.id === replyViewCommentId
                      )?.replies.length
                    }
                  </div>

                  <div className="modal-comment-list">
                    {selectedPost.comments
                      .find((c) => c.id === replyViewCommentId)
                      ?.replies.map((reply) => (
                        <div key={reply.id} className="modal-comment-item">
                          <img src={profile} alt="" />

                          <div className="comment-body">
                            <div className="comment-user-info">
                              <h5>{reply.user}</h5>

                              <span>{reply.time}</span>
                            </div>

                            <p>{reply.text}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

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
              💜 {likeTargetPost.likes}
            </div>

            <div className="like-public-text">
              좋아요를 누른 모든 사용자가 공개됩니다.
            </div>

            <div className="like-user-list">
              {likeUsers.map((user) => (
                <div key={user.id} className="like-user-item">
                  <div className="like-user-info">
                    <img src={profile} alt="" />

                    <p>{user.name}</p>
                  </div>

                  <button
                    onClick={() => handleLikeUserFollow(user.id)}
                    className={
                      user.isFollowing ? "status-following" : "status-follow"
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
            {/* 1단계: 차단 확인 창이 켜졌을 때 */}
            {showBlockConfirm ? (
              <>
                <h3>사용자를 차단할까요?</h3>
                <p className="report-sub-text">
                  차단 시 해당 사용자의 게시물이 더 이상 보이지 않습니다.
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
                    onClick={() => setShowBlockConfirm(false)}
                  >
                    취소
                  </button>
                </div>
              </>
            ) : showReportReasons ? (
              /* 2단계: 신고 버튼을 눌러 사유 선택 창이 켜졌을 때 (CSS 스타일 완벽 반영) */
              <>
                <div className="report-icon-wrap">⚠️</div>
                <h3>신고하기</h3>
                <p className="report-sub-text">
                  사유를 선택하시면 신고 처리가 완료됩니다.
                </p>

                <div className="report-options-list">
                  {[
                    "스팸 및 홍보성 콘텐츠",
                    "음란물 또는 성적 콘텐츠",
                    "혐오 발언 및 괴롭힘",
                    "부적절한 내용 및 기타",
                  ].map((reason) => (
                    <label
                      key={reason}
                      className={`report-option-item ${
                        selectedReason === reason ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="reportReason"
                        value={reason}
                        checked={selectedReason === reason}
                        onChange={(e) => setSelectedReason(e.target.value)}
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
                      alert(`[${selectedReason}] 사유로 신고되었습니다.`);
                      // 여기에 실제 신고 API 함수를 넣으시면 됩니다 (예: handleReportSubmit())
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
              /* 3단계: 기본 게시물 관리창 (가장 먼저 뜨는 화면) */
              <>
                <h3>게시물 관리</h3>
                <div className="report-btn-group">
                  <button
                    className="btn-report-action"
                    onClick={() => setShowBlockConfirm(true)}
                  >
                    차단
                  </button>
                  <button
                    className="btn-report-cancel"
                    style={{
                      backgroundColor: "var(--button-3)",
                      color: "var(--white)",
                    }}
                    onClick={() => setShowReportReasons(true)}
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
