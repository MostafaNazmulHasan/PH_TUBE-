function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => {
      displayCategories(data.categories);
    });
}

function displayCategories(categories) {
  const categoriesContainer = document.getElementById("category-container ");

  for (let category of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="btn-${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white"> ${category.category} </button>
        `;
    categoriesContainer.appendChild(categoryDiv);
  }
}

function loadVideos(searchText = "") {
  showLoader();
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoryVideos = (category_id) => {
  showLoader();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${category_id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${category_id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
 <div class="py-20 col-span-full flex flex-col justify-center items-center">
          <img src="./assets/Icon.png" alt="" />
          <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
    `;
    hideLoader();
    return;
  }

  videos.forEach((video) => {
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
        <div class="card bg-base-100">
  <!-- Thumbnail with timestamp -->
  <figure class="relative">
    <img 
      class="w-full h-[150px] object-cover" 
      src="${video.thumbnail}" 
      alt="Thumbnail" 
    />
    <span
      class="absolute bottom-2 right-2 text-sm rounded text-white bg-black px-2"
    >
      3hrs 56 min ago
    </span>
  </figure>

  <!-- Video info -->
  <div class="flex gap-3 px-0 py-5">
    
    <!-- Profile Avatar -->
    <div class="profile">
      <div class="avatar">
        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
          <img src="${video.authors[0].profile_picture}" alt="Profile" />
        </div>
      </div>
    </div>

    <!-- Video Intro -->
    <div class="intro ">
      <h2 class="text-sm font-semibold">
        ${video.title}
      </h2>
      
<p class="text-sm text-gray-400 flex gap-1">
        ${video.authors[0].profile_name}
        ${
          video.authors[0].verified === true
            ? `<img
        class="w-5 h-5"
        src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
        alt="Verified"
      />`
            : ""
        }
      </p>
     
      
      <p class="text-sm text-gray-400">
        ${video.others.views} views
      </p>
    </div>

  </div>

  <button onclick="loadVideoDetails('${
    video.video_id
  }')" class="btn btn-block">View Details</button>
</div>
  `;
    videoContainer.appendChild(videoDiv);
  });
  hideLoader();
};

function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let button of activeButtons) {
    button.classList.remove("active");
  }
}

const loadVideoDetails = (video_id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayVideoDetails(data.video);
    });
};

const displayVideoDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
<div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>

  `;
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
  console.log(e.target.value);
  loadVideos(e.target.value);
});

const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("video-container").classList.add("hidden");
};


const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("video-container").classList.remove("hidden");
};
loadCategories();
