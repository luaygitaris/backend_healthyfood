const heroModel = require('./heroModel');

exports.addHero = async (req, res) => {
  const dt = { req, flow: [] };
  const result = await heroModel.addHero(dt);
  if (result.err) return res.status(result.code).json({ flow: result.flow, error: true });
  res.status(result.code).json({ data: result.data, flow: result.flow });
};

exports.getAllHero = async (req, res) => {
  const dt = { req, flow: [] };
  const result = await heroModel.getAllHero(dt);
  if (result.err) return res.status(result.code).json({ flow: result.flow, error: true });
  res.status(result.code).json({ data: result.data, flow: result.flow });
};

exports.getHeroById = async (req, res) => {
  const dt = { req, flow: [] };
  const result = await heroModel.getHeroById(dt);
  if (result.err) return res.status(result.code).json({ flow: result.flow, error: true });
  res.status(result.code).json({ data: result.data, flow: result.flow });
};

exports.updateHero = async (req, res) => {
  const dt = { req, flow: [] };
  const result = await heroModel.updateHero(dt);
  if (result.err) return res.status(result.code).json({ flow: result.flow, error: true });
  res.status(result.code).json({ data: result.data, flow: result.flow });
};

exports.deleteHero = async (req, res) => {
  const dt = { req, flow: [] };
  const result = await heroModel.deleteHero(dt);
  if (result.err) return res.status(result.code).json({ flow: result.flow, error: true });
  res.status(result.code).json({ data: result.data, flow: result.flow });
};
