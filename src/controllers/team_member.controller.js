import TeamMember from "../models/teammember.model";
import promises from "fs";

export const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await prisma.teamMember.findMany();
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching team members' });
  }
};

export const createTeamMember = async (req, res) => {
  try {
    const { name, position, image_url, bio } = req.body;
    const newTeamMember = await prisma.teamMember.create({
      data: {
        name,
        position,
        image_url,
        bio,
      },
    });
    res.status(201).json(newTeamMember);
  } catch (error) {
    res.status(500).json({ error: 'Error creating team member' });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, image_url, bio } = req.body;
    const updatedTeamMember = await prisma.teamMember.update({
      where: { id: parseInt(id, 10) },
      data: { name, position, image_url, bio },
    });
    res.json(updatedTeamMember);
  } catch (error) {
    res.status(500).json({ error: 'Error updating team member' });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.teamMember.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting team member' });
  }
};
