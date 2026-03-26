const express = require('express');
const router = express.Router();

router.get('/', baseapi);

async function baseapi(req, res) {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mentor Connect - API Guide</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f9;
                    color: #333;
                    margin: 0;
                    padding: 20px;
                }
                h1 {
                    text-align: center;
                    color: #4CAF50;
                }
                table {
                    width: 80%;
                    margin: 20px auto;
                    border-collapse: collapse;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    background: #fff;
                }
                th, td {
                    text-align: left;
                    padding: 12px;
                    border: 1px solid #ddd;
                }
                th {
                    background-color: #4CAF50;
                    color: white;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                tr:hover {
                    background-color: #f1f1f1;
                }
                p {
                    text-align: center;
                    margin: 10px 0;
                }
            </style>
        </head>
        <body>
            <h1>Mentor Connect</h1>
            <p><b>Base API Page</b></p>
            <p><b>Backend Guide</b></p>
            <table>
                <tr>
                    <th>API Name</th>
                    <th>API Address</th>
                    <th>API Description</th>
                </tr>
                <tr>
                    <td>RegisterUser</td>
                    <td>/RegisterUser</td>
                    <td>To register new users</td>
                </tr>
                <tr>
                    <td>Login</td>
                    <td>/LoginUser</td>
                    <td>To Login the users</td>
                </tr>
                <tr>
                    <td>AllUser</td>
                    <td>/AllUsers</td>
                    <td>To show the details of all users</td>
                </tr>
                 <tr>
                    <td>AddProject</td>
                    <td>/AddProject</td>
                    <td>create a new project post</td>
                </tr>
                 <tr>
                    <td>getPostdata</td>
                    <td>/getpostdata</td>
                    <td>get all project detail </td>
                </tr>
                <tr>
                    <td>getpostdatabyid</td>
                    <td>/getpostdatabyid</td>
                    <td>get post by post id</td>
                </tr>
                <tr>
                    <td>getmyproject</td>
                    <td>/getmyproject</td>
                    <td>get projets you are woring in</td>
                </tr>
                <tr>
                    <td>SendRequest</td>
                    <td>/sendRequest</td>
                    <td>send request to join project</td>
                </tr>
                <tr>
                    <td>getrequestbyprojectid</td>
                    <td>/byprojectid</td>
                    <td>get request of specific project id</td>
                </tr>
                <tr>
                    <td>newTeam</td>
                    <td>/addtoteam</td>
                    <td>Add a member to project Team</td>
                </tr>
            </table>
        </body>
        </html>
    `);
}

module.exports = router;
