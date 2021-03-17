const init = async function() {
  const comments = document.querySelector('#comments')

  if (comments) {
    const href = window.location.href
    const fishId = href.slice(href.lastIndexOf('/') + 1)

    // check for existing comments
    try {
      const response = await fetch(`/fish/${fishId}/comments`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json'
        },
      })

      // populate the comments if there are saved comments
      if (response.status !== 404) {
        const fishComment = await response.json()
        comments.value = fishComment.comment
      }
    } catch (err) {
      console.log(`error fetching comments`, err)
    }

    document.querySelector('#save-comments-btn').addEventListener('click', async event => {
      try {
        const response = await fetch(`/fish/${fishId}/comments`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({comment: comments.value})
        })
        const savedMsg = document.querySelector('.saved-msg')
        savedMsg.classList.toggle('hide')
        window.setTimeout(toggle, 1000)
      } catch (err) {
        console.log(`error writing comments`, err)
      }
    })
  }
}

function toggle() {
  const savedMsg = document.querySelector('.saved-msg')
  savedMsg.classList.toggle('hide')
}

init()