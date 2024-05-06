<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/css/style.css">
    <script src="/js/dashboard.js" defer></script>
    {{!-- <h2>Hi, {{user.firstName}}</h2> --}}
        {{!-- <style>
        /* Style for the logo */
        .logo {
            display: flex;
            align-items: center;
            margin-bottom: 20px; /* Adjust as needed */
        }
        .logo img {
            width: 50px; /* Adjust the width of the logo */
            height: auto;
            margin-right: 10px; /* Adjust as needed */
        }
        .logo h1 {
            margin: 0;
            font-size: 24px; /* Adjust as needed */
        }
    </style> --}}
</head>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/css/style.css">
    <script src="/js/dashboard.js" defer></script>
</head>
<body>

 <!-- left Sidebar -->
<div class="sidebar bg-light">
        <!-- More sidebar items -->
        <br />
        <h3>Achievements</h3>
        <!-- You can loop through user's achievements and display them as cards -->
        {{#if achievements.length}}
        <div class="card">
            {{#each achievements}}
            <div class="card-body mb-3"> <!-- Added mb-3 class for margin-bottom -->
                <h5 class="card-title">{{this.title}}</h5>
                <p class="card-text">{{this.description}}</p>
                <p class="card-text">Type: {{this.type}}</p>
                {{!-- <p class="card-text">Goal: {{this.goal}} {{this.unitOfWorkout}}</p> --}}
            </div>
            {{/each}}
        </div>
        {{/if}}
</div>

    <!-- Main Content Area -->
    <div class="content">
        <!-- Workout logs displayed like stories -->
        <section class="mt-4">
        <h2>Profile: {{user.firstName}} {{user.lastName}}</h2> 
        <h2>All Workouts</h2>
        <div class="list-group">
            {{#each user.workouts}}
            {{!-- <a href="/profile/{{this.userID}}" class="list-group-item list-group-item-action flex-column align-items-start"> --}}
                <div class="d-flex w-100 justify-content-between">
                    <div>
                        <h6>{{this.title}}</h6>
                        <p>{{this.type}} - {{this.duration}} mins</p>
                        <p>Goal: {{this.goal}}</p>
                    </div>
                    <small>Posted on: {{this.date}}</small> <!-- Ensure you have a dateFormat helper -->
                </div>
            </a>
            {{/each}}
        </div>
    </section>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.7.12/umd.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>

