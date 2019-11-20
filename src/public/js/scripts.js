document.getElementById("post-comment").style.display = 'none';

const btnlike = document.getElementById("btn-like");
const btndelete = document.getElementById("btn-delete");
const btnToggleComment = document.getElementById("btn-toggle-comment");

const addLike = e => {
  e.preventDefault();
  const imgId = e.target.getAttribute("data-id");
  const route = `/images/${imgId}/like`;
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };
  fetch(route, config)
    .then(data => data.json())
    .catch(err => console.log("Error: " + err))
    .then(json => {
      document.querySelector(".likes-count").innerHTML = json.likes;
    });
};

const deletePost = e => {
  e.preventDefault();
  const response = confirm("Are you sure you want to delete this image?");
  if(response){
      const imgId = btndelete.getAttribute("data-id");
      const route = `/images/${imgId}`;
      const config = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      };
      fetch(route, config)
        .then(data => data.json())
        .catch(err => console.log("Error: " + err))
        .then(json => {
          if(json){
            btndelete.classList.replace('btn-danger', 'btn-success');
            btndelete.querySelector('i').classList.replace('fa-times', 'fa-check');
            document.getElementById('msg-delete').textContent = 'Deleted!';
          }
        });
  }
};

const toggleComment = e => {
    const postComment = document.getElementById("post-comment");
    if(postComment.style.display === 'none'){
        postComment.style.display = '';
    } else {
        postComment.style.display = "none";
    };
}

// Like button request
if (btnlike) btnlike.addEventListener("click", e => addLike(e));
// Delete Post request
if (btndelete) btndelete.addEventListener("click", e => deletePost(e));

if(btnToggleComment) btnToggleComment.addEventListener("click", e => toggleComment(e));
