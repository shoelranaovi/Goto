 const formatComments = (comments) => {
    const commentMap = new Map();
    
    comments.forEach((comment) => {
      commentMap.set(comment._id.toString(), { ...comment.toObject(), replies: [] });
    });
  
    const structuredComments = [];
  
    comments.forEach((comment) => {
      if (comment.parentId) {
        const parent = commentMap.get(comment.parentId.toString());
        if (parent) {
          parent.replies.push(commentMap.get(comment._id.toString()));
        }
      } else {
        structuredComments.push(commentMap.get(comment._id.toString()));
      }
    });
  
    return structuredComments;
  };
  
  module.exports = formatComments;