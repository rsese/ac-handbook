const init = async function() {
  const newCommentField = document.querySelector('#new-comment-field')
    if (newCommentField) {

    const href = window.location.href
    const thingId = href.slice(href.lastIndexOf('/') + 1)

    document.querySelector('#save-comments-btn').addEventListener('click', async event => {
      try {
        const response = await fetch(`/fish/${thingId}/comments`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({comment: newCommentField.value})
        })

        const savedMsg = document.querySelector('.saved-msg')
        savedMsg.classList.toggle('hide')
        window.setTimeout(toggle, 1000)

        // add new comment to comment list
        const createdComment = await response.json()
        const newComment = document.createElement('li')
        const newCommentTimeStamp = document.createElement('span')

        newCommentTimeStamp.classList.add('timeStamp')
        newCommentTimeStamp.appendChild(document.createTextNode(createdComment.timeStamp))
        newComment.appendChild(newCommentTimeStamp)
        newComment.appendChild(document.createTextNode(createdComment.body))
        document.querySelector('.comments').appendChild(newComment)

        newCommentField.value = ""
      } catch (err) {
        console.log(`error saving comment`, err)
      }
    })
  }

  document.querySelector('.site-nav-container .burger').addEventListener('click', event => {
   event.target.nextElementSibling.classList.toggle('collapsed')
  })
}

function toggle() {
  const savedMsg = document.querySelector('.saved-msg')
  savedMsg.classList.toggle('hide')
}

init()