$(document).ready(function () {

    let rows = 5, // Number of users to display on a page
        page = 1, // Current page number
        query = '', // Text in the search text box entered by the user
        paging_start = 1, // Page number for the start of the pagination
        paging_size = 5; // Number of pagination page buttons displayed

    // Assign click functionality to the search button
    $("#search_button").click(function(){
        query = $("#username").val();
        page = 1;
        paging_start = 1;
        searchUsers();
    });

    // Searches for users matching the entry in the text box
    function searchUsers(){
        $.get({url: "https://api.github.com/search/users?q=" + query + "&page=" + page + "&per_page=" + rows,
            type: "GET",
            headers: { "Authorization": "token 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" }})
            .done(processData)
            .fail(function() { $("#results").text("Failed Request"); });
    };

    // Handles displaying the results of the search
    function processData(data) {
        // Clear any previous elements
        $("#results").empty();
        // Only display results if there are matches
        if(data.items.length > 0) {
            // Add the search result total users found count
            let total_users_row = document.createElement("div");
            let total_users_col = document.createElement("div");
            let total_users_count = document.createElement("div");
            total_users_row.className = "row";
            total_users_col.className = "col";
            total_users_count.className = "total_user_style";
            total_users_count.innerText = data.total_count.toLocaleString() + " users";
            total_users_col.append(total_users_count);
            total_users_row.append(total_users_col);
            $("#results").append(total_users_row);

            data.items.forEach(function(item, index) {
                // Formatting for entire user entry
                let row = document.createElement("div");
                // One column holds the user avatar
                let col1 = document.createElement("div");
                // The outer holds all of the other user info
                let col2 = document.createElement("div");
                row.className = "row py-4";
                row.style.borderTop = "1px solid #e1e4e8";
                col1.className = "col-1";
                col2.className = "col-11";

                // Add User Avatar
                let avatar = document.createElement("img");
                avatar.src = item.avatar_url;
                avatar.width = 50;
                col1.append(avatar);

                // Nested grid in each user result for user info
                let inner_row1 = document.createElement("div");
                let inner_row2 = document.createElement("div");
                let inner_row3 = document.createElement("div");
                let inner_col1 = document.createElement("div");
                let inner_col2 = document.createElement("div");
                let inner_col3 = document.createElement("div");
                inner_row1.className = "row";
                inner_row2.className = "row";
                inner_row3.className = "row";
                inner_col1.className = "col d-inline-flex";
                inner_col2.className = "col";
                inner_col3.className = "col d-inline-flex";

                // Add user login info
                let login = document.createElement("a");
                login.href = item.html_url;
                login.innerText = item.login;
                login.className = "usernames";
                inner_col1.append(login);

                // Handle user details not returned in the general search
                $.get({url: "https://api.github.com/users/" + item.login,
                    type: "GET",
                    headers: { "Authorization": "token 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" }})
                    .done(function(data){
                        // Adds user name
                        let username = document.createElement("div");
                        username.innerText = "- " + data.name;
                        username.className = "usernames";
                        inner_col1.append(username);

                        // Adds user id
                        let id = document.createElement("div");
                        id.innerText = "- " + item.id;
                        username.className = "usernames";
                        inner_col1.append(id);

                        // Adds user bio
                        let bio = document.createElement("div");
                        bio.className = "user_bio";
                        bio.innerText = data.bio;
                        inner_col2.append(bio);

                        // Adds user location
                        let location = document.createElement("div");
                        location.className = "user_info";
                        location.innerText = data.location;
                        inner_col3.append(location);

                        // Adds user blog url
                        let blog = document.createElement("div");
                        blog.className = "user_info";
                        blog.innerText = data.blog;
                        inner_col3.append(blog);
                    });

                inner_row1.append(inner_col1);
                inner_row2.append(inner_col2);
                inner_row3.append(inner_col3);
                col2.append(inner_row1, inner_row2, inner_row3);
                row.append(col1, col2);

                $("#results").append(row);
            });

            // Pagination Handling
            let paging = document.createElement("ul");
            paging.className = "pagination justify-content-center";

            // Adds a previous button to move back to the previous 5 page block
            let prev_item = document.createElement("li");
            let prev_link = document.createElement("a");
            prev_item.className = "page-item";
            prev_link.className = "page-link";
            prev_link.href = "#";
            prev_link.innerText = "Previous";
            if(paging_start < 6) {
                prev_item.className = "page-item disabled";
            }
            prev_link.onclick = function(){
                page = paging_start - 1;
                paging_start -= paging_size;
                searchUsers();
            };
            prev_item.append(prev_link);
            paging.append(prev_item);

            // Adds each page button to the pagination
            for(let i = paging_start; i < paging_start + paging_size; ++i) {
                let page_item = document.createElement("li");
                let page_link = document.createElement("a");
                page_item.className = "page-item";
                page_link.className = "page-link";
                page_link.href = "#";
                page_link.innerText = i.toString();
                if(i === page) {
                    page_item.className = "page-item active";
                }
                else if((i - 1) * rows > data.total_count) {
                    page_item.className = "page-item disabled";
                } else {
                    page_link.onclick = function(){
                        page = i;
                        searchUsers();
                    };
                }
                page_item.append(page_link);
                paging.append(page_item);
            }

            // Adds a next button to move to the next 5 pagination pages
            let next_item = document.createElement("li");
            let next_link = document.createElement("a");
            next_item.className = "page-item";
            next_link.className = "page-link";
            next_link.href = "#";
            next_link.innerText = "Next";
            if((paging_start + paging_size - 1) * rows >= data.total_count) {
                next_item.className = "page-item disabled";
            }
            next_link.onclick = function(){
                page = paging_start + paging_size;
                paging_start += paging_size;
                searchUsers();
            };
            next_item.append(next_link);
            paging.append(next_item);

            $("#results").append(paging);

            // Handle entries with no matches
        } else {
            let row = document.createElement("div");
            let col = document.createElement("div");
            row.className = "row";
            col.className = "col";
            col.innerText = "No Users Found";
            row.appendChild(col);
            $("#results").append(row);
        }
    }
});