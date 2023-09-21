const socket = (io) =>
  io.on("connection", (stream) => {
    console.log(`connection established by: ${stream.id}`);

    stream.on("join_room", (room) => stream.join(room));

    stream.on("send_attendance", (appointment) =>
      io.to(appointment.schedule).emit("recieve_attendance", appointment)
    );

    stream.on("start_exam", (data) =>
      io.to(data._schedule?._id).emit("start_exam", data)
    );
  });

module.exports = socket;
