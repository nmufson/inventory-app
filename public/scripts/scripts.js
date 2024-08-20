document.addEventListener('DOMContentLoaded', () => {
  const clickableElements = document.querySelectorAll(
    '.category-card,.item-card'
  );

  const categoryCards = document.querySelectorAll('.category-card');
  const itemCards = document.querySelectorAll('.item-card');

  clickableElements.forEach((element) => {
    element.addEventListener('click', async () => {
      document.querySelector('#modal').classList.add('show');
      document.querySelector('#backdrop').classList.add('show');
    });
  });

  itemCards.forEach((element) => {
    element.addEventListener('click', async () => {
      const itemName = element.textContent.trim(); // Get item name from the element's text or another attribute

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

        // Update modal content with fetched data
        document.querySelector('#modalContent').innerHTML = `
        <div>
          <p>Cateogry: ${data.returnedCategory[0].name}</p>
        </div>
        <div>
          <p>Selected Item: ${itemName}</p>
        </div>
        `;

        document.querySelector('#modal').classList.add('show');
        document.querySelector('#backdrop').classList.add('show');
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    });
  });

  categoryCards.forEach((element) => {
    element.addEventListener('click', async () => {
      const categoryName = element.textContent.trim(); // Get item name from the element's text or another attribute

      try {
        const response = await fetch(
          `/item?categoryName=${encodeURIComponent(categoryName)}`
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

        const itemsHTML = data.returnedItems
          .map(
            (item) => `
          <div>
            <p>Item Name: ${item.name}</p>
          </div>
        `
          )
          .join('');
        // Update modal content with fetched data
        document.querySelector('#modalContent').innerHTML = `
        <div>
          <p>Category: ${categoryName}</p>
        </div>
        ${itemsHTML} <!-- Insert generated items HTML here -->
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
