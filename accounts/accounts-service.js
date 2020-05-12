module.exports = {
  isValidPost
}

function isValidPost(post){
  return Boolean(post.name && post.budget)
}