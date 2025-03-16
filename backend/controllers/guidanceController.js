const guidance = require('../data/guidance');

const getGuidance = (req, res) => {
  res.json(guidance);
};

const getGuidanceById = (req, res) => {
  const guidanceId = parseInt(req.params.id);
  const guide = guidance.find((g) => g.id === guidanceId);

  if (guide) {
    res.json(guide);
  } else {
    res.status(404).json({ error: 'Guidance not found' });
  }
};

module.exports = { getGuidance, getGuidanceById };