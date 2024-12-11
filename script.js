let socketid = "";
let serverUrl = "https://socket-jpo-server.onrender.com";
const socket = io(serverUrl);

current_color = "";
const color_active = document.querySelector(".smiley");
const color_shade = document.querySelector(".color_shade");
const color_gradient = document.querySelector(".color_gradient");

const colors = {
    red: ["255", "0", "0"],
    orange: ["255", "165", "0"],
    yellow: ["255", "255", "0"],
    green: ["0", "128", "0"],
    cyan: ["0", "255", "255"],
    magenta: ["255", "0", "255"],
    white: ["255", "255", "255"],
};

const color_btn = document.querySelectorAll(".color-button");
const animation_btn = document.querySelectorAll(".animation-button");
const execute_btn = document.querySelector(".execute");

let choose_color = "";
let choose_animation = "";

socket.on("connect", () => {
    console.log("Connected");

    if (localStorage.getItem("color")) {
        color_active.style.background = localStorage.getItem("color");
    }

    if (localStorage.getItem("gradient")) {
        color_shade.style.background = localStorage.getItem("gradient");
        color_gradient.style.background = localStorage.getItem("gradient");
    }
    if (localStorage.getItem("animation")) {
        switch (localStorage.getItem("animation")) {
            case "fill":
                color_shade.classList.remove("switch_animation");
                color_shade.classList.remove("load_animation");
                break;
            case "switch":
                color_shade.classList.add("switch_animation");
                color_shade.classList.remove("load_animation");
                break;
            case "load":
                color_shade.classList.add("load_animation");
                color_shade.classList.remove("switch_animation");
                break;
        }
    }
});
socket.on("hashtags", (data) => {
    console.log("Hashtags: ", data);
});
socket.on("disconnect", () => {
    console.log("Disconnected");
});

color_btn.forEach((color) => {
    color.addEventListener("click", () => {
        if (color.id in colors) {
            choose_color = color.id;

            color_active.style.background = color.id;
            color_shade.style.background = `rgba(${colors[color.id][0]}, ${
                colors[color.id][1]
            }, ${colors[color.id][2]}, 0.3)`;
            color_gradient.style.background = `rgba(${colors[color.id][0]}, ${
                colors[color.id][1]
            }, ${colors[color.id][2]}, 0.3)`;

            localStorage.setItem("color", color.id);
            localStorage.setItem(
                "gradient",
                `rgba(${colors[color.id][0]}, ${colors[color.id][1]}, ${
                    colors[color.id][2]
                }, 0.3)`
            );
        }
    });
});

animation_btn.forEach((animation) => {
    animation.addEventListener("click", () => {
        switch (animation.id) {
            case "fill":
                choose_animation = animation.id;
                color_shade.classList.remove("switch_animation");
                color_shade.classList.remove("load_animation");
                break;
            case "switch":
                choose_animation = animation.id;
                color_shade.classList.add("switch_animation");
                color_shade.classList.remove("load_animation");
                break;
            case "load":
                choose_animation = animation.id;
                color_shade.classList.add("load_animation");
                color_shade.classList.remove("switch_animation");
                break;
        }

        localStorage.setItem("animation", animation.id);
    });
});

execute_btn.addEventListener("click", () => {
    socket.emit("msg", choose_color);
    socket.emit("msg", choose_animation);
});
