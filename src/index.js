const app = require('./server');
app.listen(app.get('port'), () => {
    const output_message =
        `Server running on port ${app.get('port')}
Visit localhost:${app.get('port')} on Internet browser to use the web application
`;
    console.log(output_message);
});