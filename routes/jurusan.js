const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET all jurusan
router.get('/', (req, res) => {
    connection.query('SELECT * FROM jurusan', (err, rows) => {
        if (err) {
            console.error('Error retrieving jurusan data:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Jurusan data retrieved successfully');
        return res.status(200).json({ status: true, message: 'Data Jurusan', data: rows });
    });
});

// CREATE new jurusan
router.post('/store', (req, res) => {
    const { nama_jurusan } = req.body;
    if (!nama_jurusan) {
        return res.status(400).json({ status: false, message: 'Nama Jurusan is required' });
    }

    const data = { nama_jurusan };

    connection.query('INSERT INTO jurusan SET ?', data, (err, result) => {
        if (err) {
            console.error('Error creating Jurusan:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Jurusan created successfully');
        return res.status(201).json({ status: true, message: 'Jurusan has been created!', data: result });
    });
});

/// GET jurusan by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM jurusan WHERE id_j = ?', id, (err, rows) => {
        if (err) {
            console.error('Error retrieving jurusan data:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }

        if (rows.length === 0) {
            console.error('Jurusan not found with ID:', id);
            return res.status(404).json({ status: false, message: 'Jurusan not found' });
        }

        console.log('Jurusan data retrieved successfully');
        return res.status(200).json({ status: true, message: 'Jurusan Data', data: rows[0] });
    });
});


// UPDATE jurusan by ID
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { nama_jurusan } = req.body;

    if (!nama_jurusan) {
        return res.status(400).json({ status: false, message: 'Nama Jurusan is required' });
    }

    const data = { nama_jurusan };

    connection.query('UPDATE jurusan SET ? WHERE id_j= ?', [data, id], (err, result) => {
        if (err) {
            console.error('Error updating Jurusan:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('Jurusan updated successfully');
        return res.status(200).json({ status: true, message: 'Jurusan has been updated!', data: result });
    });
});

// DELETE jurusan by ID
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM jurusan WHERE id_j = ?', id, (err, result) => {
        if (err) {
            console.error('Error deleting Jurusan:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Jurusan not found' });
        }

        console.log('Jurusan deleted successfully');
        return res.status(200).json({ status: true, message: 'Jurusan has been deleted!', data: result });
    });
});

module.exports = router;
