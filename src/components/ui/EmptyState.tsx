import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionLink?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  actionLink,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && <div className="mb-6">{icon}</div>}
      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-secondary text-sm sm:text-base mb-8 max-w-md">{description}</p>
      {actionLabel && (actionLink || onAction) && (
        actionLink ? (
          <Link to={actionLink}>
            <Button variant="primary">{actionLabel}</Button>
          </Link>
        ) : (
          <Button variant="primary" onClick={onAction}>{actionLabel}</Button>
        )
      )}
    </div>
  );
};

export default EmptyState;
