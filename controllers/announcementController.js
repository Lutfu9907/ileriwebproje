const Announcement = require("../models/announcementModel");

// Duyuru ekleme işlemi
exports.createAnnouncement = (req, res) => {
  const { title, content, startDate, endDate } = req.body;

  const announcement = new Announcement({
    title,
    content,
    startDate,
    endDate,
  });

  announcement
    .save()
    .then(() => {
      res.redirect("/announcements");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/announcements");
    });
};

// Duyuru listeleme işlemi
exports.listAnnouncements = (req, res) => {
  Announcement.find()
    .sort({ startDate: -1 })
    .then((announcements) => {
      res.render("announcements/list", { announcements });
    })
    .catch((error) => {
      console.log(error);
      res.render("announcements/list", { announcements: [] });
    });
};

// Duyuru düzenleme işlemi
exports.editAnnouncement = (req, res) => {
  const { id } = req.params;

  Announcement.findById(id)
    .then((announcement) => {
      res.render("announcements/edit", { announcement });
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/announcements");
    });
};

// Duyuru oluşturma formunu gösteren işlevi ekle
exports.showCreateForm = (req, res) => {
  res.render("announcements/create");
};

// Duyuru güncelleme işlemi
exports.updateAnnouncement = (req, res) => {
  const { id } = req.params;
  const { title, content, startDate, endDate } = req.body;

  Announcement.findByIdAndUpdate(id, {
    title,
    content,
    startDate,
    endDate,
  })
    .then(() => {
      res.redirect("/announcements");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/announcements");
    });
};
