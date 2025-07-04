const menuModel = require('./menuModel');

exports.addMenu = async (req, res) => {
  const dt = { req, flow: [] };
  const result = await menuModel.addMenu(dt);
  if (result.err) return res.status(result.code).json({ flow: result.flow, error: true });
  res.status(result.code).json({ data: result.data, flow: result.flow });
};

exports.getAllMenu = async (req, res) => {
  const dt = { req, flow: [] };
  const result = await menuModel.getAllMenu(dt);
  if (result.err) return res.status(result.code).json({ flow: result.flow, error: true });
  res.status(result.code).json({ data: result.data, flow: result.flow });
};

exports.getMenuById = async (req, res) => {
  const dt = { req, flow: [] };
  const result = await menuModel.getMenuById(dt);
  if (result.err) return res.status(result.code).json({ flow: result.flow, error: true });
  res.status(result.code).json({ data: result.data, flow: result.flow });
};

exports.updateMenu = async (req, res) => {
  const dt = { req, flow: [] };
  const result = await menuModel.updateMenu(dt);
  if (result.err) return res.status(result.code).json({ flow: result.flow, error: true });
  res.status(result.code).json({ data: result.data, flow: result.flow });
};

exports.deleteMenu = async (req, res) => {
  const dt = { req, flow: [] };
  const result = await menuModel.deleteMenu(dt);
  if (result.err) return res.status(result.code).json({ flow: result.flow, error: true });
  res.status(result.code).json({ data: result.data, flow: result.flow });
};
