 function revise(opts) {

    let newLine = `
    `;
    let cmd= `git filter-branch --force --env-filter '`;


    if(!opts.fromEmail && !opts.fromName) throw 'fuck';
    if(!opts.toEmail && !opts.toName) throw 'ass';

    //Add in vars where necessary
    if(opts.fromEmail) cmd += `OLD_EMAIL="${opts.fromEmail}"${newLine}`;
    if(opts.fromName) cmd += `OLD_NAME="${opts.fromName}"${newLine}`;
    if(opts.toEmail) cmd += `NEW_EMAIL="${opts.toEmail}"${newLine}`;
    if(opts.toName) cmd += `NEW_NAME="${opts.toName}"${newLine}`;

    let firstIf = "";
    let secondIf = "";

    let firstThen = "";
    let secondThen = "";

    if(opts.fromEmail && opts.fromName) {

      //Idea; seperate these raw strings into vars (like firstIf) and use it to construct everything at the end,
      //thus making logic checks if opts exist only once
      firstIf +=
       `if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ] && [ "$GIT_COMMITTER_NAME" = "$OLD_NAME" ]
        then${newLine}`;
      secondIf +=
       `if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ] && [ "$GIT_AUTHOR_NAME" = "$OLD_NAME" ]
        then${newLine}`;

    } else if(opts.fromEmail) {

      firstIf +=
       `if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
        then${newLine}`;
      secondIf +=
       `if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
        then${newLine}`;

    } else if(opts.fromName) {

      firstIf +=
       `if [ "$GIT_COMMITTER_NAME" = "$OLD_EMAIL" ]
        then${newLine}`;
      secondIf +=
       `if [ "$GIT_AUTHOR_NAME" = "$OLD_EMAIL" ]
        then${newLine}`;

    }

    if(opts.toEmail) {
      firstThen += 
        `   export GIT_COMMITTER_NAME="$NEW_EMAIL"${newLine}`;
      secondThen +=
        `   export GIT_AUTHOR_NAME="$NEW_NAME"${newLine}`;
    }

    if(opts.toName) {
      firstThen += 
        `   export GIT_COMMITTER_NAME="$NEW_NAME"${newLine}`;
      secondThen +=
        `   export GIT_AUTHOR_NAME="$NEW_EMAIL"${newLine}`;
    }
   
    //Close then(s)
    firstThen += `fi{$newLine}`;
    secondThen += `fi{$newLine}`;

    //Construct our conditional body
    cmd += firstIf + firstThen + secondIf + secondThen;

    //Finally, close our command
    cmd += `
      ' --tag-name-filter cat -- --branches --tags
    `;

    return cmd;
  }

const shit = revise({
  fromEmail: 'cock@mail.com',
  fromName: 'Cock',
  toEmail: 'shit@mail.com',
  toName: 'Shit'
})

console.log(shit)
