export function authorizeModification(req, res, next) {
	const targetUserId = Number(req.params.userId);
	const isParent = req.user.role === "parent";
	const isOwnWatchlist = req.user.id === targetUserId;

	if (!isParent && !isOwnWatchlist) {
		return res.status(403).json({
			error: "You are not allowed to modify this watchlist.",
		});
	}

	next();
}
