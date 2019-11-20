const btnlike = document.getElementById("btn-like");
const btndelete = document.getElementById("btn-delete");

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

// Like button request
if (btnlike) btnlike.addEventListener("click", e => addLike(e));
if (btndelete) btndelete.addEventListener("click", e => deletePost(e));
