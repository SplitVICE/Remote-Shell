/**
 * index.html script. Handles all server requests to execute commands.
 */

// ==========================================================================
// Button capture & event listeners.
// ==========================================================================

// Turn off button click. Asks user if they are sure. If so, sends
// request to server.
document.getElementById('btn_shutdown').addEventListener('click', () => {
  Swal.fire({
    title: 'Turn off',
    text: "Your PC will turn off. Are you sure?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      send_shutdownOrder();
    }
  })
});

// ==========================================================================
// Server request functions.
// ==========================================================================

// Turn off request order. Sends request to server to execute shutdown -s -t 1
async function send_shutdownOrder() {
  const request = await fetch('/api/service', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'shutdown' }
    )
  });

  const response = await request.json();

  if (response.status == 'failed' &&
    response.description == 'test mode activated') {

    const html = /* html */ `
      <br>
      <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">Test mode is activated</h4>
        <p>Some commands require the application to not be in TEST_MODE.</p>
        <hr>
        <p class="mb-0">Go to ./.env file and change "TEST_MODE=TRUE" to 
        "TEST_MODE=FALSE" to enable this functionality.</p>
      </div>`;

    message(html);

  } else if (response.status == 'failed' &&
    response.description == 'missing required parameters') {
    const html = /* html */ `
      <br>
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Missing required parameters</h4>
        <hr>
        <p class="mb-0">Error 500 has occurred. Contact support.</p>
      </div>`;

    message(html);
  }
}

// ==========================================================================
// HTML helper functions.
// ==========================================================================

// Renders a message on HTML on the <div id='message'></div> tag.
function message(input) {
  document.getElementById('message').innerHTML = input;
}