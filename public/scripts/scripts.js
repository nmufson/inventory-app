document.addEventListener('DOMContentLoaded', () => {
  const clickableElements = document.querySelectorAll(
    '.category-container,.item-container'
  );

  clickableElements.forEach((element) => {
    element.addEventListener('click', async () => {
      const itemName = element.textContent.trim(); // Get item name from the element's text or another attribute
      console.log(itemName);

      try {
        const response = await fetch(
          `/category?itemName=${encodeURIComponent(itemName)}`
        );

        // Check if response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Check the Content-Type header to ensure it is JSON
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Expected JSON, but received: ' + contentType);
        }

        const data = await response.json();
        console.log(data.returnedCategory);
        // Update modal content with fetched data
        document.querySelector('#modalContent').innerHTML = `
          <p>${data.returnedCategory.name}</p>
        `;

        document.querySelector('#modal').classList.add('show');
        document.querySelector('#backdrop').classList.add('show');
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    });
  });

  document.querySelector('#closeBtn').addEventListener('click', () => {
    document.querySelector('#modal').classList.remove('show');
    document.querySelector('#backdrop').classList.remove('show');
  });

  document.querySelector('#backdrop').addEventListener('click', () => {
    document.querySelector('#modal').classList.remove('show');
    document.querySelector('#backdrop').classList.remove('show');
  });
});
