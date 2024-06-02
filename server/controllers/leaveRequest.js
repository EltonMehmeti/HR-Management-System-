const LeaveRequest = require('../models/leaveRequest');
const Employee = require('../models/employee');
const HRPersonnel = require('../models/hrPersonnel');
const LeaveType = require('../models/leaveType');

const createLeaveRequest = async (req, res) => {
    try {
        const { startDate, endDate, reason, status, comments, employeeID, hrPersonnelID, leaveTypeID } = req.body;

        const [employee, hrPersonnel, leaveType] = await Promise.all([
            Employee.findByPk(employeeID),
            HRPersonnel.findByPk(hrPersonnelID),
            LeaveType.findByPk(leaveTypeID)
        ]);

        if (!employee || !hrPersonnel || !leaveType) {
            return res.status(404).json({ error: 'Employee, HR personnel, or leave type not found' });
        }

        const leaveRequest = await LeaveRequest.create({
            startDate,
            endDate,
            reason,
            status,
            comments,
            employeeID,
            hrPersonnelID,
            leaveTypeID
        });

        res.status(201).json(leaveRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getAllLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await LeaveRequest.findAll();
        res.json(leaveRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getLeaveRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const leaveRequest = await LeaveRequest.findByPk(id);
        if (!leaveRequest) {
            return res.status(404).json({ error: 'Leave request not found' });
        }
        res.json(leaveRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateLeaveRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { startDate, endDate, reason, status, comments, employeeID, hrPersonnelID, leaveTypeID } = req.body;
        const updatedLeaveRequest = await LeaveRequest.update(
            { startDate, endDate, reason, status, comments, employeeID, hrPersonnelID, leaveTypeID },
            { where: { id } }
        );
        res.json(updatedLeaveRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteLeaveRequest = async (req, res) => {
    try {
        const { id } = req.params;
        await LeaveRequest.destroy({ where: { id } });
        res.json({ message: 'Leave request deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getAllLeaveRequestsEmployee = async (req, res) => {
    try {
        const { employeeID } = req.params;
        const leaveRequests = await LeaveRequest.findAll({ where: { employeeID } });
        res.json(leaveRequests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createLeaveRequest,
    getAllLeaveRequests,
    getLeaveRequestById,
    updateLeaveRequest,
    deleteLeaveRequest,
    getAllLeaveRequestsEmployee
};
