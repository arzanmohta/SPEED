// src/app/articles/InteractiveButtons.tsx (Client Component)
"use client"; // Mark this as a Client Component for interactivity

const InteractiveButtons = ({ articleId }: { articleId: string }) => {
  const handleAction = (action: string) => {
    console.log(`${action} action triggered for article with ID: ${articleId}`);
    // You can add your API logic here to handle the respective action (Approve/Reject/Delete)
  };

  return (
    <>
      <button 
        onClick={() => handleAction('Approve')}
        style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer', width: 70}}
      >
        Approve
      </button>
      {" "}
      <button 
        onClick={() => handleAction('Reject')}
        style={{ padding: '5px 10px', backgroundColor: '#ff9800', color: '#fff', border: 'none', cursor: 'pointer', width: 70}}
      >
        Reject
      </button>
      {<br></br>}
      <button 
        onClick={() => handleAction('Delete')}
        style={{ padding: '5px 10px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', cursor: 'pointer', width: 70, marginTop: 4.2}}
      >
        Delete
      </button>
    </>
  );
};

export default InteractiveButtons;
