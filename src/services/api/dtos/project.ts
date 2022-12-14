import { DocumentDto } from "./document";

export interface ProjectDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  presentsInterest: boolean;
  title: string;

  documents: DocumentDto[];

  numarInregistrareSenat?: string;
  numarInregistrareGuvern?: string;
  proceduraLegislativa?: string;
  cameraDecizionala?: string;
  termenAdoptare?: string;
  tipInitiativa?: string;
  caracter?: string;
  esteProceduraDeUrgenta?: boolean;
  stadiu?: string;
  initiator?: string;
  consultati?: string;

  attachments: string[];
}