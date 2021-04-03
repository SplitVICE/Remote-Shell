// ==========================================================================
// Button capture & event listeners.
// ==========================================================================

const checkbox__darkmode = document.getElementById('checkbox__darkmode');
const div__style = document.getElementById('div__style');
let easterEgg_counter = 0;

// Turn off PC button click. Asks user if they are sure. If so, sends
// request to server.
document.getElementById('btn__shutdown').addEventListener('click', () => {
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
      send__shutdownOrder();
    }
  })
});

// Restart PC button click. Asks user if they are sure. If so, sends
// request to server.
document.getElementById('btn__restart').addEventListener('click', () => {
  Swal.fire({
    title: 'Turn off',
    text: "Your PC will restart. Are you sure?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      send__restartOrder();
    }
  })
});

// La Cachona button click.
document.getElementById('btn__cachona').addEventListener('click', () => {
  send__LaCachonaOrder();
});

// Terminal instructions sending button trigger.
document.getElementById('btn__cmd').addEventListener('click', () => {
  const textarea__cmd = document.getElementById('textarea__cmd').value;
  if (textarea__cmd == '')
    return
  else
    send__cmdOrder(textarea__cmd);
});

// Clears textarea__cmd content.
document.getElementById('btn__cmdClear').addEventListener('click', () => {
  document.getElementById('textarea__cmd').value = '';
});

checkbox__darkmode.addEventListener('change', () => {
  easterEgg__manager();
  if (checkbox__darkmode.checked == true) {
    localStorage.setItem('status__darkmode', 'true');
    div__style.innerHTML = `<link rel="stylesheet" href="./css/style__dark.css">`;
  } else {
    localStorage.setItem('status__darkmode', 'false');
    div__style.innerHTML = `<link rel="stylesheet" href="./css/style__light.css">`;
  }
});

// ==========================================================================
// Server request functions.
// ==========================================================================

// Turn off request order. Sends request to server to execute shutdown -s -t 1
async function send__shutdownOrder() {
  const request = await fetch('/api/service', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'shutdown' }
    )
  });

  const response = await request.json();

  if (response.status == 'success') {
    const html = /* html */`
    Bye bye :>
    `;
    message(html);
  }

  if (response.status == 'failed' &&
    response.description == 'test mode activated') {

    message(message__testModeActivated);

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

// Restart request order. Sends request to server to execute shutdown -r
async function send__restartOrder() {
  const request = await fetch('/api/service', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'restart' }
    )
  });

  const response = await request.json();

  if (response.status == 'success') {
    const html = /* html */`
    Bye bye :>
    `;
    message(html);
  }

  if (response.status == 'failed' &&
    response.description == 'test mode activated') {

    message(message__testModeActivated);

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

// Opens a YouTube video of a song called La Cachona on browser.
async function send__LaCachonaOrder() {
  const request = await fetch('/api/service', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'la cachona' }
    )
  });

  await request.json();
  sweetAlert_top_right_notice('La Cachona executed to play successfully', 5000, 'success');
}

async function send__cmdOrder(textarea__cmd) {
  const request = await fetch('/api/service', {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'cmd', instructions: textarea__cmd })
  });
  const response = await request.json();
  if (response.status == 'success') {
    sweetAlert_top_right_notice('Terminal instructions sent successfully', 5000, 'success');
  }
}

// ==========================================================================
// Helper elements and functions.
// ==========================================================================

// Renders a message on HTML on the <div id='message'></div> tag.
function message(input) {
  document.getElementById('message').innerHTML = input;
}

const message__testModeActivated = /* html */ `
      <br>
      <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">Test mode is activated</h4>
        <p>Some commands require the application to not be in TEST_MODE.</p>
        <hr>
        <p class="mb-0">Go to /.env file and change "TEST_MODE=TRUE" to 
        "TEST_MODE=FALSE" to enable this functionality.</p>
      </div>`;

function sweetAlert_top_right_notice(message, time, icon) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: time,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: icon,
    title: message
  })
}

function easterEgg__manager() {

  let inki__triggered = false;

  if (easterEgg_counter == 7) {
    document.getElementById('btn__cachona').classList.remove('invisible');
  }

  // Shows Inki Easter Egg if dark mode toggled 30 times.
  if (easterEgg_counter == 17) {

    if (!inki__triggered) {

      const div__content = /* html */ `
    <img id='inki__img' class='inki' src="./img/inki.gif" alt="inki">
    <link rel="stylesheet" href="./css/inki.css">
    `;

      const inki__div = document.getElementById('inki__div');

      inki__div.innerHTML = div__content

      const inki__img = document.getElementById('inki__img');
      inki__img.classList.add('inki--animation--in');

      setTimeout(() => {
        inki__img.classList.remove('inki--animation--in');
        inki__img.classList.add('inki--animation--out');
        setTimeout(() => {
          inki__div.innerHTML = '';
        }, 400);
      }, 2000);
      inki__triggered = true;
    }

  }

  if (easterEgg_counter < 30)
    easterEgg_counter++;
}

// ==========================================================================
// Procedural process.
// ==========================================================================

// Dark mode handling.
if (localStorage.getItem('status__darkmode') == undefined)
  localStorage.setItem('status__darkmode', 'true');
else {
  const status__darkmode = localStorage.getItem('status__darkmode');

  if (status__darkmode == 'true')
    div__style.innerHTML = `<link rel="stylesheet" href="./css/style__dark.css">`;
  else {
    div__style.innerHTML = `<link rel="stylesheet" href="./css/style__light.css">`;
    checkbox__darkmode.checked = false;
  }
}