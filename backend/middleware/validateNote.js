function validateNote(
  req,
  res,
  next
) {

  const {
    title,
    content
  } = req.body;

  if (
    !title ||
    title.length < 3
  ) {

    return res.status(400).json({

      message:
        "Title must be at least 3 characters"

    });
  }

  if (!content) {

    return res.status(400).json({

      message:
        "Content is required"

    });
  }

  next();
}

module.exports =
  validateNote;