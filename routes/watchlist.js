import express from "express";
import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../utils/db.js";
import { authorizeModification } from "../middleware/authorize.js";

const router = express.Router();

// GET /api/watchlist/:userId
// Cualquier usuario autenticado puede consultar cualquier watchlist
router.get("/:userId", (req, res) => {
  const userId = Number(req.params.userId);

  const watchlist = getWatchlist(userId);

  if (watchlist === null) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  res.status(200).json(watchlist);
});

// POST /api/watchlist/:userId/movies
router.post(
  "/:userId/movies",
  authorizeModification,
  (req, res) => {
    const userId = Number(req.params.userId);

    const movie = addMovie(userId, req.body);

    if (movie === null) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(201).json(movie);
  },
);

// PUT /api/watchlist/:userId/movies/:movieId
router.put(
  "/:userId/movies/:movieId",
  authorizeModification,
  (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);

    const movie = updateMovie(userId, movieId, req.body);

    if (movie === null) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    res.status(200).json(movie);
  },
);

// DELETE /api/watchlist/:userId/movies/:movieId
router.delete(
  "/:userId/movies/:movieId",
  authorizeModification,
  (req, res) => {
    const userId = Number(req.params.userId);
    const movieId = Number(req.params.movieId);

    const deleted = deleteMovie(userId, movieId);

    if (deleted === null) {
      return res.status(404).json({
        error: "Movie not found",
      });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
    });
  },
);

export default router;