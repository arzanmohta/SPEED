"use client"; // Mark this as a Client Component for interactivity

import { useState } from 'react';

const InteractiveButtons = ({
  articleId,
  currentStatus,
  onDelete,
  onUpdate,
}: {
  articleId: string;
  currentStatus: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, status: string) => void;
}) => {
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleAction = async (action: string) => {
    if (action === 'Delete') {
      setLoadingDelete(true); // Set loading for delete
      try {
        const res = await fetch(`/api/articles/${articleId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          onDelete(articleId); // Notify parent to remove article from UI
          console.log('Article deleted successfully');
        } else {
          console.error('Failed to delete the article');
        }
      } catch (error) {
        console.error('Error deleting the article:', error);
      } finally {
        setLoadingDelete(false); // Reset loading state for delete
      }
    } else if (action === 'Reject' || action === 'Approve') {
      const isApprove = action === 'Approve';
      if (isApprove) {
        setLoadingApprove(true); // Set loading for approve
      } else {
        setLoadingReject(true); // Set loading for reject
      }

      const newStatus = isApprove ? 'Approved' : 'Rejected';
      try {
        const res = await fetch(`/api/articles/${articleId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }), // Send the new status to the API
        });

        if (res.ok) {
          onUpdate(articleId, newStatus); // Notify parent to update article status
          console.log(`Article status updated to ${newStatus}`);
        } else {
          console.error('Failed to update article status');
        }
      } catch (error) {
        console.error(`Error updating article status to ${newStatus}:`, error);
      } finally {
        if (isApprove) {
          setLoadingApprove(false); // Reset loading state for approve
        } else {
          setLoadingReject(false); // Reset loading state for reject
        }
      }
    }
  };

  return (
    <>
      {/* Approve button */}
      <button
        onClick={() => handleAction('Approve')}
        style={{
          padding: '5px 10px',
          backgroundColor: currentStatus === 'Pending' ? '#4CAF50' : '#ccc', // Grey out if not pending
          color: '#fff',
          border: 'none',
          cursor: currentStatus === 'Pending' ? 'pointer' : 'not-allowed',
          width: 70,
        }}
        disabled={loadingApprove || currentStatus !== 'Pending'} // Use loadingApprove state
      >
        {loadingApprove ? 'Approving...' : 'Approve'}
      </button>
      {" "}
      {/* Reject button */}
      <button
        onClick={() => handleAction('Reject')}
        style={{
          padding: '5px 10px',
          backgroundColor: currentStatus === 'Pending' ? '#ff9800' : '#ccc',
          color: '#fff',
          border: 'none',
          cursor: currentStatus === 'Pending' ? 'pointer' : 'not-allowed',
          width: 70,
        }}
        disabled={loadingReject || currentStatus !== 'Pending'} // Use loadingReject state
      >
        {loadingReject ? 'Rejecting...' : 'Reject'}
      </button>
      {<br />}
      {/* Delete button */}
      <button
        onClick={() => handleAction('Delete')}
        style={{
          padding: '5px 10px',
          backgroundColor: '#ff4d4d',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          width: 70,
          marginTop: 4.2,
        }}
        disabled={loadingDelete} // Use loadingDelete state
      >
        {loadingDelete ? 'Deleting...' : 'Delete'}
      </button>
    </>
  );
};

export default InteractiveButtons;
