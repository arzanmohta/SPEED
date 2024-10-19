// src/app/articles/InteractiveButtons.tsx (Client Component)
"use client"; // Mark this as a Client Component for interactivity

import { useState } from 'react';

const InteractiveButtons = ({ articleId, onDelete }: { articleId: string, onDelete: (id: string) => void }) => {
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: string) => {
    console.log(`${action} action triggered for article with ID: ${articleId}`);
    
    if (action === 'Delete') {
      setLoading(true); // Set loading state to true
      try {
        const res = await fetch(`/api/articles/${articleId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          // If deletion is successful, call the onDelete callback to update the parent component
          onDelete(articleId);
          console.log('Article deleted successfully');
        } else {
          console.error('Failed to delete the article');
        }
      } catch (error) {
        console.error('Error deleting the article:', error);
      } finally {
        setLoading(false); // Reset loading state after completion
      }
    } else {
      // Placeholder for Approve/Reject actions
      console.log(`${action} action triggered but no API logic yet.`);
    }
  };

  return (
    <>
      <button 
        onClick={() => handleAction('Approve')}
        style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer', width: 70 }}
        disabled={loading}
      >
        Approve
      </button>
      {" "}
      <button 
        onClick={() => handleAction('Reject')}
        style={{ padding: '5px 10px', backgroundColor: '#ff9800', color: '#fff', border: 'none', cursor: 'pointer', width: 70 }}
        disabled={loading}
      >
        Reject
      </button>
      {<br></br>}
      <button 
        onClick={() => handleAction('Delete')}
        style={{ padding: '5px 10px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', cursor: 'pointer', width: 70, marginTop: 4.2 }}
        disabled={loading}
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </>
  );
};

export default InteractiveButtons;
