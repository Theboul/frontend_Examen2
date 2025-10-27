import React from 'react';
import { type Gestion } from '../types/gestion';
import { Button } from '../../../components/ui/Button';

interface GestionCardProps {
  gestion: Gestion;
  onActivate: (id: number) => void;
  onDelete: (id: number) => void;
}

export const GestionCard: React.FC<GestionCardProps> = ({
  gestion,
  onActivate,
  onDelete,
}) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '16px',
      margin: '8px 0',
      borderRadius: '8px',
      backgroundColor: gestion.activo ? '#f0f9ff' : 'white'
    }}>
      <h3>Gestión {gestion.anio}-{gestion.semestre}</h3>
      <p>{gestion.fecha_inicio} - {gestion.fecha_fin}</p>
      
      <div>
        {gestion.activo && <span>✅ Activa</span>}
        {!gestion.activo && (
          <Button onClick={() => onActivate(gestion.id_gestion)}>
            Activar
          </Button>
        )}
        <Button 
          variant="danger" 
          onClick={() => onDelete(gestion.id_gestion)}
          disabled={gestion.activo}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};