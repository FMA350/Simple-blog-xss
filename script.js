const radioButtonOptions = 3;





function postComment() {
    var commentNumber = parseInt(localStorage.getItem('numberOfComments'));
    /*check if commentNumber is initialized or if it is NaN */
    if (isNaN(commentNumber)) {
        commentNumber = 0;
        document.getElementById("commentPlaceholder").outerHTML = "";
    }

    var radio = document.getElementsByClassName('radio');

    for (var i = 0; i < radioButtonOptions; i++) {
        if (radio[i].checked) {
            var gender = radio[i].value;
            break;
        }
    }
    var comment = {
        'firstName': document.getElementById("firstName").value,
        'lastName': document.getElementById("lastName").value,
        'email': document.getElementById("email").value,
        'dateOfBirth': document.getElementById('dateOfBirth').value,
        'comment': document.getElementById('comment').value,
        'gender': gender
    };
    localStorage.setItem("numberOfComments", JSON.stringify(commentNumber + 1));
    localStorage.setItem("comment" + commentNumber, JSON.stringify(comment));

    getComments();
    console.log(comment);

// lets remove the data in the fields
    document.getElementById("firstName").value  = "";
    document.getElementById("lastName").value   = "";
    document.getElementById("email").value      = "";
    document.getElementById('dateOfBirth').value= "";
    document.getElementById('comment').value    = "";

    if(gender = "male"){
      document.getElementById('genderMale').checked = false;
    }
    else if (gender = "female") {
      document.getElementById('genderFemale').checked = false;
    }
    else{
      document.getElementById('genderNot').checked = false;
    }
// now let us add it back
    document.getElementById("firstName").value    = comment.firstName;
    document.getElementById("lastName").value     = comment.lastName;
    document.getElementById("email").value        = comment.email;
    document.getElementById('dateOfBirth').value  = comment.dateOfBirth;
    document.getElementById('comment').value      = comment.comment;

    if(gender == 'male'){
      document.getElementById('genderMale').checked = true;
    }
    else if(gender == 'female'){
      document.getElementById('genderFemale').checked = true;
    }
    else{
      document.getElementById('genderNot').checked = true;
    }
    // we are done
    return;
};

function getComments() {
    var commentNumber = parseInt(localStorage.getItem('numberOfComments'));
    /*check if commentNumber is initialized or if it is NaN */
    if (isNaN(commentNumber)) {
        commentNumber = 0;
    }
    if (commentNumber == 0) {
        var div = document.createElement('div');
        div.className = "comment";
        div.id = "commentPlaceholder"
        var p = document.createElement('p');
        var txt = document.createTextNode("No comments to display! Be the first one!");
        p.appendChild(txt);
        div.appendChild(p);
        document.getElementById("commentSection").prepend(div);
    }
    else {
        /* clean up the section before addiing the comments */
        document.getElementById("commentSection").innerHTML = "";
        for (var i = 0; i < commentNumber; i++) {
            var data = JSON.parse(localStorage.getItem("comment" + i));
            /* Let's create the HTML representation */

            /* good way of doing it (createTextNode sanitizes the input)*/

            /*
            var div = document.createElement('div');
            div.className = "comment";
            div.id = i;
            var p = document.createElement('p');
            var txt = document.createTextNode(data.comment);
            var name = document.createTextNode(data.firstName);
            p.appendChild(txt);
            div.appendChild(p);
            div.appendChild(name);
            document.getElementById("commentSection").prepend(div);
            */

            /* bad bad bad way of doing it (innerHTML does not sanitize text), good to show XSS vulnerability*/
            var div = document.createElement('div');
            div.className = "comment";
            div.id = i;
            document.getElementById("commentSection").append(div);
            // will display the last one first.
            div.innerHTML = "<p>" + data.comment + "</p><br>" + data.firstName;
        }
    }
}

   /* To trigger a simple XSS vulnerability, type a comment that has the comment section as follows:
    * &quot; = "
    *
    *
    * <button onclick="eval(&quot;alert('hi');&quot;)">test it</button>
    * or
    * <div onmouseover="eval(&quot;log(localStorage);&quot;)">AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>
    * <button onclick="eval(&quot;alert('hi');&quot;)">test it</button>
    */
