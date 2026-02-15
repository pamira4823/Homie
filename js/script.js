const quotes = [
"Some friendships turn into family.",
"Memories fade. Legends stay.",
"Built different. Together."
];

let qIndex = 0;
const quoteEl = document.querySelector(".quote");
const loader = document.getElementById("loader");
const homeSection = document.querySelector(".home");

if (quoteEl && loader && homeSection) {

    if (sessionStorage.getItem("visited")) {
        loader.style.display = "none";
        homeSection.classList.remove("hidden");
    } else {
        setInterval(() => {
            qIndex = (qIndex + 1) % quotes.length;
            quoteEl.textContent = quotes[qIndex];
        }, 2000);

        setTimeout(() => {
            loader.style.display = "none";
            homeSection.classList.remove("hidden");
            sessionStorage.setItem("visited", "true");
        }, 6000);
    }
}

function goBack() {
    window.history.back();
}

function goHome() {
    sessionStorage.setItem("visited", "true");
    window.location.href = "index.html";
}

/* ===== Gallery Generator ===== */

const gallery = document.getElementById("gallery");

if (gallery) {
    const year = document.body.dataset.year;
    const type = document.body.dataset.type;

    const files = {
        2023: {
            images: ["242023.jpeg","252023.jpeg","262023.jpeg"],
            videos: []
        },
        2024: {
            images: ["102024.jpeg","122024.jpeg","132024.jpeg","142024.jpeg","152024.jpeg","162024.jpeg","172024.jpeg","182024.jpeg","192024.jpeg","202024.jpeg","212024.jpeg","222024.jpeg","232024.jpeg"],
            videos: ["312024.mp4","322024.mp4","332024.mp4","342024.mp4","352024.mp4","362024.mp4"]
        },
        2025: {
            images: ["12025.jpeg","22025.jpeg","32025.jpeg","42025.jpeg","52025.jpeg","62025.jpeg","72025.jpeg","82025.jpeg","92025.jpeg","112025.jpeg"],
            videos: ["272025.mp4","282025.mp4","292025.mp4"]
        }
    };

    const yearData = files[year];

    if (type === "images") {

        if (yearData.images.length === 0) {
            showEmptyMessage("No pictures here yet.");
        } else {
            yearData.images.forEach(file => {
                const img = document.createElement("img");
                img.src = `${year}/${file}`;
                img.classList.add("media-item");
                gallery.appendChild(img);
            });
            enableFocusMode();
        }
    }

    if (type === "videos") {

        if (yearData.videos.length === 0) {
            showEmptyMessage("No videos here yet.");
        } else {
            yearData.videos.forEach(file => {
                const video = document.createElement("video");
                video.src = `${year}/${file}`;
                video.controls = false;
                video.classList.add("media-item");
                gallery.appendChild(video);
            });
            enableFocusMode();
        }
    }
}

/* ===== Empty State Message ===== */

function showEmptyMessage(text) {
    const message = document.createElement("div");
    message.classList.add("empty-message");
    message.textContent = text;
    gallery.appendChild(message);
}

/* ===== Focus Mode ===== */

function enableFocusMode() {
    const items = document.querySelectorAll(".media-item");

    items.forEach(item => {
        item.addEventListener("click", function () {

            const isActive = this.classList.contains("active");

            items.forEach(el => {
                el.classList.remove("active");
                el.classList.remove("faded");

                if (el.tagName === "VIDEO") {
                    el.pause();
                    el.currentTime = 0;
                }
            });

            if (!isActive) {

                this.classList.add("active");

                items.forEach(el => {
                    if (el !== this) {
                        el.classList.add("faded");
                    }
                });

                if (this.tagName === "VIDEO") {
                    setTimeout(() => {
                        this.play();
                    }, 350);
                }

                this.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
    });
}
