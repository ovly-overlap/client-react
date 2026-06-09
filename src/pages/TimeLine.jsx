import { useState } from "react";
import profile from "../assets/profile-icon.svg";
import post from "../assets/eye-icon.svg"; 
import "./TimeLine.css";

// 신고 사유 선택지 목록 데이터
const REPORT_REASONS = [
  "욕설 / 비하",
  "음란물 / 성적 내용",
  "허위 정보 / 루머 유포",
  "도배 / 반복 게시글",
  "기타"
];

// 임의의 실제 '좋아요 누른 사람 목록' 데이터 세팅
const LIKE_USERS_DATA = [
  { id: 1, name: "성호어깨에치여사망", isFollowing: true },
  { id: 2, name: "성호어깨에치여사망", isFollowing: false },
  { id: 3, name: "성호어깨에치여사망", isFollowing: false },
  { id: 4, name: "성호어깨에치여사망", isFollowing: false },
  { id: 5, name: "성호어깨에치여사망", isFollowing: false },
  { id: 6, name: "성호어깨에치여사망", isFollowing: false },
  { id: 7, name: "성호어깨에치여사망", isFollowing: false },
  { id: 8, name: "성호어깨에치여사망", isFollowing: false },
];

const INITIAL_POSTS = [
  {
    id: 1,
    username: "링링",
    time: "2분 전",
    content: "아 진짜 리쿠 너무 잘생겼어요 미친!! 게다가 오늘 브넥도 상남자여서 진짜 너무 좋아요❤️",
    images: [post, post, post],
    extraImagesCount: 3,
    likes: "7,654", 
    commentsCount: 778,
    comments: [
      { id: 101, user: "으아내정신", time: "1시간 전", text: "I love you, riwoo my dear darling S2", likes: 1, replies: [] },
      { id: 102, user: "류류", time: "1일 전", text: "제발 리우 옷 손민수하고 싶다 저 왼쪽 사진", likes: 10000000, replies: [] },
    ]
  },
  {
    id: 2,
    username: "아레아레RM",
    time: "15분 전",
    content: "컴백 너무 기대돼요! X투X 이번벤드에는 티케팅 성공해서 꼭 보러가고 싶어요! 다들 콘서트때 봬요~🍩",
    images: [post, post],
    extraImagesCount: 0,
    likes: "12",
    commentsCount: 1,
    comments: [
      { id: 201, user: "망개떡", time: "30분 전", text: "저도 꼭 가고 싶어요ㅠㅠ 티케팅 파이팅!", likes: 5, replies: [] }
    ]
  }
];

export default function TimeLine() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [selectedPostId, setSelectedPostId] = useState(null); 
  const [likeModalPostId, setLikeModalPostId] = useState(null); 
  
  const [reportModalPostId, setReportModalPostId] = useState(null); 
  const [selectedReason, setSelectedReason] = useState("");         
  const [isReportSubmitted, setIsReportSubmitted] = useState(false); 

  const [commentInput, setCommentInput] = useState("");
  const [activeReplyCommentId, setActiveReplyCommentId] = useState(null); 
  const [replyInput, setReplyInput] = useState(""); 

  const selectedPost = posts.find(p => p.id === selectedPostId);
  const activeComment = selectedPost?.comments.find(c => c.id === activeReplyCommentId);
  const likeTargetPost = posts.find(p => p.id === likeModalPostId);

  const handlePostClick = (postItem) => {
    setSelectedPostId(postItem.id);
    setCommentInput(""); 
    setActiveReplyCommentId(null); 
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
  };

  const handleReportSubmit = () => {
    if (!selectedReason) return;
    setIsReportSubmitted(true); 
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
      replies: [] 
    };

    setPosts(posts.map(postItem => {
      if (postItem.id === selectedPostId) {
        return {
          ...postItem,
          commentsCount: postItem.commentsCount + 1,
          comments: [newComment, ...postItem.comments] 
        };
      }
      return postItem;
    })); 
    setCommentInput(""); 
  };

  const handleReplySubmit = (e, commentId) => {
    e.preventDefault();
    if (!replyInput.trim() || !selectedPostId) return;

    const newReply = {
      id: Date.now(),
      user: "나(User)",
      time: "방금 전",
      text: replyInput,
      likes: 0,
      isMine: true
    };

    setPosts(posts.map(postItem => {
      if (postItem.id === selectedPostId) {
        return {
          ...postItem,
          commentsCount: postItem.commentsCount + 1,
          comments: postItem.comments.map(comm => {
            if (comm.id === commentId) {
              return { ...comm, replies: [...comm.replies, newReply] };
            }
            return comm;
          })
        };
      }
      return postItem;
    }));
    setReplyInput("");
  };

  const handleCommentDelete = (commentId, isReply = false, parentCommentId = null) => {
    setPosts(posts.map(postItem => {
      if (postItem.id === selectedPostId) {
        let newComments = [...postItem.comments];
        if (isReply) {
          newComments = newComments.map(comm => {
            if (comm.id === parentCommentId) {
              return { ...comm, replies: comm.replies.filter(r => r.id !== commentId) };
            }
            return comm;
          });
        } else {
          newComments = newComments.filter(comm => comm.id !== commentId);
        }
        return {
          ...postItem,
          commentsCount: Math.max(0, postItem.commentsCount - 1),
          comments: newComments
        };
      }
      return postItem;
    }));
    if (!isReply && commentId === activeReplyCommentId) {
      setActiveReplyCommentId(null);
    }
  };

  return (
    <div className="timeline">
      <div className="timeline-top">
        <p className="active">추천</p>
        <span>|</span>
        <p>팔로잉</p>
      </div>
      
      <div className="timeline-wrapper">
        <div className="timeline-posts">
          {posts.map((item) => (
            <div key={item.id} className="post" onClick={() => handlePostClick(item)} style={{ cursor: 'pointer' }}>
              <div className="post-top2">
                <div className="post-profile">
                  <img src={profile} alt="" />
                  <div><h4>{item.username}</h4><span>{item.time}</span></div>
                </div>
                <div className="more" onClick={(e) => openReportModal(e, item.id)}>⋯</div>
              </div>
              <div className="post-center">
                <p>{item.content}</p>
                <div className={`post-images ${item.images.length === 2 ? 'two' : ''}`}>
                  {item.images.map((imgSrc, index) => {
                    if (index === item.images.length - 1 && item.extraImagesCount > 0) {
                      return (
                        <div key={index} className="last-image">
                          <img src={imgSrc} alt="" />
                          <span>+{item.extraImagesCount}</span>
                        </div>
                      );
                    }
                    return <img key={index} src={imgSrc} alt="" />;
                  })}
                </div>
              </div>
              <div className="post-bottom">
                <div onClick={(e) => openLikeModal(e, item.id)} style={{ cursor: 'pointer' }}>
                  💜 {item.likes}
                </div>
                <div>💬 {item.commentsCount}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 우측 레이아웃 */}
        <div className="timeline-right">
          <div className="search-card">
            <div className="search-box">
              <input type="text" placeholder="검색" />
            </div>
            <div className="chat-box">
              <div className="chat-top"><span>최근 검색어</span><span>모두지우기</span></div>
              <div className="chat-user"><img src={profile} alt="" /><p>망개떡</p><span>x</span></div>
              <div className="chat-user"><img src={profile} alt="" /><p>우나기</p><span>x</span></div>
              <div className="chat-user"><img src={profile} alt="" /><p>ChristmasTree</p><span>x</span></div>
            </div>
          </div>
          <div className="friend-box">
            <h3>추천 친구</h3>
            <div className="friend-user"><div className="friend-left"><img src={profile} alt="" /><p>Jin라면먹고싶다</p></div><button>팔로우</button></div>
            <div className="friend-user"><div className="friend-left"><img src={profile} alt="" /><p>으아내정신</p></div><button>팔로우</button></div>
            <div className="friend-user"><div className="friend-left"><img src={profile} alt="" /><p>성호어깨에치여사망</p></div><button>팔로우</button></div>
          </div>
        </div>
      </div>

      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPostId(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-left">
              <div className="post-top2">
                <div className="post-profile">
                  <img src={profile} alt="" />
                  <div><h4>{selectedPost.username}</h4><span>{selectedPost.time}</span></div>
                </div>
                <div className="more" onClick={(e) => openReportModal(e, selectedPost.id)}>⋯</div>
              </div>
              <div className="post-center">
                <p className="modal-detail-text">{selectedPost.content}</p>
                <div className="modal-image-grid">
                  {selectedPost.images.map((imgSrc, idx) => (<img key={idx} src={imgSrc} alt="" />))}
                </div>
              </div>
              <div className="post-bottom">
                <div onClick={(e) => openLikeModal(e, selectedPost.id)} style={{ cursor: 'pointer' }}>
                  💜 {selectedPost.likes}
                </div>
                <div>💬 {selectedPost.commentsCount}</div>
              </div>
            </div>

            <div className="modal-right">
              {activeReplyCommentId && activeComment ? (
                <div className="reply-only-view">
                  <div className="reply-view-header">
                    <span className="back-to-comments" onClick={() => setActiveReplyCommentId(null)} style={{ cursor: 'pointer' }}>〈</span>
                    <h3>전체 댓글 보기</h3>
                  </div>
                  <div className="original-parent-focus">
                    <img src={profile} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <div className="parent-info">
                      <div className="parent-header">
                        <h5 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{activeComment.user}</h5>
                        <span style={{ fontSize: '11px', color: '#999' }}>{activeComment.time}</span>
                      </div>
                      <p>{activeComment.text}</p>
                      <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>💜 {activeComment.likes}</div>
                    </div>
                  </div>
                  <div className="reply-writer-profile">
                    <img src={profile} alt="" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>으아내정신</span>
                  </div>
                  <form onSubmit={(e) => handleReplySubmit(e, activeComment.id)} className="modal-comment-write has-text">
                    <textarea 
                      placeholder={`${activeComment.user}님에게 답글`} 
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleReplySubmit(e, activeComment.id); } }}
                      autoFocus
                    />
                    <div className="modal-comment-btns">
                      <button type="button" className="btn-cancel" onClick={() => setActiveReplyCommentId(null)}>취소</button>
                      <button type="submit" className="btn-submit" disabled={!replyInput.trim()}>등록</button>
                    </div>
                  </form>
                  <div className="modal-comments-count">전체 답글 <span>{activeComment.replies?.length || 0}</span></div>
                  <div className="modal-comment-list">
                    {activeComment.replies?.map((reply) => (
                      <div key={reply.id} className="modal-comment-item">
                        <img src={profile} alt="" style={{ width: "32px", height: "32px" }} />
                        <div className="comment-body">
                          <div className="comment-header">
                            <div className="comment-user-info"><h5>{reply.user}</h5><span>{reply.time}</span></div>
                            {reply.isMine && <div className="comment-delete-btn" onClick={() => handleCommentDelete(reply.id, true, activeComment.id)}>✕</div>}
                          </div>
                          <p>{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="modal-comments-title">댓글</h3>
                  <form onSubmit={handleCommentSubmit} className={`modal-comment-write ${commentInput.trim() ? 'has-text' : ''}`}>
                    <textarea 
                      placeholder="댓글을 입력하세요..." 
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleCommentSubmit(); } }}
                    />
                    <div className="modal-comment-btns">
                      <button type="button" className="btn-cancel" onClick={() => setSelectedPostId(null)}>취소</button>
                      <button type="submit" className="btn-submit" disabled={!commentInput.trim()}>등록</button>
                    </div>
                  </form>
                  <div className="modal-comment-list">
                    {selectedPost.comments?.map((comment) => (
                      <div key={comment.id} className="modal-comment-item" onClick={() => { setActiveReplyCommentId(comment.id); setReplyInput(""); }} style={{ cursor: 'pointer' }}>
                        <img src={profile} alt="" />
                        <div className="comment-body">
                          <div className="comment-header">
                            <div className="comment-user-info"><h5>{comment.user}</h5><span>{comment.time}</span></div>
                            {comment.isMine ? <div className="comment-delete-btn" onClick={(e) => { e.stopPropagation(); handleCommentDelete(comment.id); }}>✕</div> : <div className="comment-more">⋯</div>}
                          </div>
                          <p style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{comment.text}</p>
                          <div className="comment-actions" style={{ marginTop: '6px', color: '#616FF4', fontSize: '13px' }}>
                            💜 {comment.likes.toLocaleString()} <span style={{ marginLeft: '8px', fontWeight: 'bold' }}>💬 답글달기</span>
                          </div>
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
        <div className="like-modal-overlay" onClick={() => setLikeModalPostId(null)}>
          <div className="like-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="like-modal-header">
              <h3>좋아요</h3>
              <button className="like-modal-close-btn" onClick={() => setLikeModalPostId(null)}>✕</button>
            </div>
            <div className="like-modal-count-box">💜 {likeTargetPost.likes}</div>
            <div className="like-user-list">
              {LIKE_USERS_DATA.map((user, index) => (
                <div key={index} className="like-user-item">
                  <div className="like-user-info">
                    <img src={profile} alt="프로필" />
                    <p>{user.name}</p>
                  </div>
                  {user.isFollowing ? (
                    <button className="status-following">팔로잉</button>
                  ) : (
                    <button className="status-follow">팔로우</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      {reportModalPostId && (
        <div className="report-modal-overlay" onClick={() => setReportModalPostId(null)}>
          <div className="report-modal-container" onClick={(e) => e.stopPropagation()}>
            
            {!isReportSubmitted ? (
              <>
                <div className="report-icon-wrap">⚠️</div>
                <h3>신고하기</h3>
                <p className="report-sub-text">이 게시물을 신고하는 이유를 선택해주세요.</p>

                <div className="report-options-list">
                  {REPORT_REASONS.map((reason, index) => (
                    <label 
                      key={index} 
                      className={`report-option-item ${selectedReason === reason ? 'selected' : ''}`}
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
                    onClick={handleReportSubmit}
                    disabled={!selectedReason}
                  >
                    신고
                  </button>
                  <button 
                    className="btn-report-cancel" 
                    onClick={() => setReportModalPostId(null)}
                  >
                    취소
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="report-icon-wrap" style={{ color: '#616FF4', fontSize: '56px', margin: '20px 0 10px 0' }}>✓</div>
                <h3 style={{ fontSize: '24px', marginBottom: '8px' }}>신고 완료</h3>
                <p className="report-sub-text" style={{ textAlign: 'center', lineHeight: '1.5', marginBottom: '32px' }}>
                  정상적으로 신고가 접수되었습니다.<br />
                  검토에는 최대 24시간이 소요될 수 있습니다.
                </p>
                <div className="report-btn-group">
                  <button 
                    className="btn-report-cancel" 
                    style={{ backgroundColor: '#616FF4', color: '#fff' }}
                    onClick={() => setReportModalPostId(null)}
                  >
                    확인
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