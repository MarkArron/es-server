const socket = (io) =>
  io.on("connection", (stream) => {
    console.log(`connection established by: ${stream.id}`); // show everytime someone connect. You should connect socket in app.js

    stream.on("send_click", (clicks) =>
      stream.broadcast.emit("recieve_click", clicks)
    );

    //for pets
    stream.on("add_pet", (pet) => stream.broadcast.emit("add_pet", pet));
    stream.on("delete_pet", (index) =>
      stream.broadcast.emit("delete_pet", index)
    );
    stream.on("update_pet", (obj) => stream.broadcast.emit("update_pet", obj));

    //for persons
    stream.on("add_person", (person) =>
      stream.broadcast.emit("add_person", person)
    );
    stream.on("delete_person", (index) =>
      stream.broadcast.emit("delete_person", index)
    );
    stream.on("update_person", (obj) =>
      stream.broadcast.emit("update_person", obj)
    );

    //for tasks
    stream.on("add_task", (task) => stream.broadcast.emit("add_task", task));
    stream.on("delete_task", (index) =>
      stream.broadcast.emit("delete_task", index)
    );
    stream.on("update_task", (obj) =>
      stream.broadcast.emit("update_task", obj)
    );

    //for books
    stream.on("add_book", (book) => stream.broadcast.emit("add_book", book));
    stream.on("delete_book", (index) =>
      stream.broadcast.emit("delete_book", index)
    );
    stream.on("update_book", (obj) =>
      stream.broadcast.emit("update_book", obj)
    );
  });

module.exports = socket;
