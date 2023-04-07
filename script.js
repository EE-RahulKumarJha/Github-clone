
JavaScript:

```javascript
// Code to toggle the dropdown menu in the profile section
const dropdownMenu = document.querySelector('.profile .fa-chevron-down');
const dropdownList = document.querySelector('.dropdown-menu');

dropdownMenu.addEventListener('click', function() {
  dropdownList.classList.toggle('show');
});

// Code to close the dropdown menu when user clicks outside of it
window.addEventListener('click', function(event) {
  if (event.target != dropdownMenu && event.target.parentNode != dropdownList) {
    dropdownList.classList.remove('show');
  }
});
// Fetch the user's profile data from the Github API
fetch('https://api.github.com/user', {
  headers: {
    'Authorization': 'Bearer <access_token>'
  }
})
.then(response => response.json())
.then(data => {
  // Update the dashboard with the user's name
  const username = data.login;
  document.getElementById('username').innerText = username;

  // Fetch the user's recent activity from the Github API
  fetch(`https://api.github.com/users/${username}/events`, {
    headers: {
      'Authorization': 'Bearer <access_token>'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Filter the events to only show pushes and pull requests
    const activity = data.filter(event => event.type === 'PushEvent' || event.type === 'PullRequestEvent').slice(0, 5);

    // Display the activity on the dashboard
    const activityList = document.getElementById('activity-list');
    activity.forEach(event => {
      const repoName = event.repo.name.split('/')[1];
      const message = event.payload.commits ? event.payload.commits[0].message : `${event.payload.action} ${event.payload.pull_request.title}`;
      const li = document.createElement('li');
      li.innerText = `${repoName}: ${message}`;
      activityList.appendChild(li);
    });
  });

  // Fetch the user's repositories from the Github API
  fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      'Authorization': 'Bearer <access_token>'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Display the repositories on the dashboard
    const repoList = document.getElementById('repo-list');
    data.forEach(repo => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = repo.html_url;
      a.innerText = repo.name;
      li.appendChild(a);
      repoList.appendChild(li);
    });
  });
});
// Check if a session exists
const accessToken = sessionStorage.getItem('access_token');

if (!accessToken) {
  // If no session exists, redirect to the login page
  window.location.href = '/login.html';
} else {
  // Fetch the user's profile data from the Github API
  fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    // Update the dashboard with the user's name
    const username = data.login;
    document.getElementById('username').innerText = username;

    // Fetch the user's recent activity from the Github API
    fetch(`https://api.github.com/users/${username}/events`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Filter the events to only show pushes and pull requests
      const activity = data.filter(event => event.type === 'PushEvent' || event.type === 'PullRequestEvent').slice(0, 5);

      // Display the activity on the dashboard
      const activityList = document.getElementById('activity-list');
      activity.forEach(event => {
        const repoName = event.repo.name.split('/')[1];
        const message = event.payload.commits ? event.payload.commits[0].message : `${event.payload.action} ${event.payload.pull_request.title}`;
        const li = document.createElement('li');
        li.innerText = `${repoName}: ${message}`;
        activityList.appendChild(li);
      });
    });

    // Fetch the user's repositories from the Github API
    fetch(`https://api.github.com/users/${username}/repos`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      // Display the repositories on the dashboard
      const repoList = document.getElementById('repo-list');
      data.forEach(repo => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = repo.html_url;
        a.innerText = repo.name;
        li.appendChild(a);
        repoList.appendChild(li);
      });
    });
  });
}
