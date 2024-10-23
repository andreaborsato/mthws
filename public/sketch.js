const socket = io();

// Handle new user ID and content class
socket.on("new-user-content", ({ userId }) => {
  console.log(`User ${userId} connected`);

  if (userId % 2 === 0) {
    console.log("pari");
    client = "pari";
    test();
  } else {
    console.log("dispari");
    client = "dispari";
    test();
  }

  if (client == "dispari") {
    document.getElementById("content").style.display = "block";
    document.getElementById("content2").style.display = "none";
  } else if (client == "pari") {
    document.getElementById("content").style.display = "none";
    document.getElementById("content2").style.display = "block";
  }

  // Handle user disconnection
  socket.on("user-disconnected", (disconnectedUserId) => {
    console.log(`User ${disconnectedUserId} disconnected`);
  });
});

function test() {
  if (client == "pari") {
    console.log("ratatat");
  } else if (client == "dispari") {
    console.log("ouiiiiii");
  }
}

test();
