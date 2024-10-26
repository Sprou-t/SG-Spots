import { response } from "express";
import Itenary from "../models/models.itenary.js";
import mongoose from "mongoose";

export const getItenary = async (req, res) => {
	try {
		const itenary = await Itenary.find({});
		res.status(200).json({ success: true, data: itenary });
	} catch (error) {
		res.status(500).json({ success: false, message: "server error" });
	}
};

export const createItenary = async (req, res) => {
	const itenary = req.body;
	//check if req data is sent correctly
	if (!itenary.title || !itenary.description) {
		return res
			.status(400)
			.json({ success: false, message: "please input required fields!" });
	}
	const newItenary = new Itenary(itenary);
	try {
		await newItenary.save();
		res.status(201).json({ success: true, message: `itenary created: ${newItenary}` });
	} catch (error) {
		console.error(`error in itenary creation: ${error.message}`);
		res.status(500).json({ success: false, message: "server error" });
	}
};

export const updateItenary = async (req, res) => {
	const { id } = req.params;
	const itenary = req.body; // this new update will be sent in using postman

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: "invalid product id" });
	}
	try {
		const updatedItenary = await Itenary.findByIdAndUpdate(id, itenary, {
			new: true,
		});
		console.log(`updated itenary to send: ${updatedItenary}`);
		res.status(201).json({success:true, data: updatedItenary})
	} catch (error) {
		console.error(`error in updating itenary: ${error.message}`);
		res.status(500).json({ success: false, message: "server error" });
	}
};

export const deleteItenary = async (req, res) => {
	const { id } = req.params;

	try {
		const deletedItenary = await Itenary.findByIdAndDelete(id);

		if (!deletedItenary) {
			// findbyID would return null if Itenary not found
			return res
				.status(404)
				.json({ success: false, message: "Itenary not found" });
		}

		// Itenary was successfully deleted
		res.status(200).json({ success: true, message: "Itenary deleted" });
	} catch (error) {
		// If there was a server or validation error
		res.status(500).json({ success: false, message: "Server Error" });
	}
}