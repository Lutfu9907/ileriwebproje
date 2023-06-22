const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");

// Duyuru ekleme yeri
router.post("/", announcementController.createAnnouncement);

// Duyuru listeleme yeri
router.get("/", announcementController.listAnnouncements);

// Duyuru düzenleme yeri
router.get("/:id/edit", announcementController.editAnnouncement);

// Duyuru güncelleme yeri
router.post("/:id", announcementController.updateAnnouncement);

// Duyuru oluşturma sayfasını gösteren yeri ekle
router.get("/create", announcementController.showCreateForm);

module.exports = router;
