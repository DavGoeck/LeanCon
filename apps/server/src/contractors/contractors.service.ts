import { Injectable } from '@nestjs/common';
import { Contractors } from 'api';
import { v4 } from 'uuid'

@Injectable()
export class ContractorsService {

    contractors: Contractors[] = []

    getAll(projectId: string) {
        return this.contractors
            .filter(contractor => contractor.projectId === projectId)
    }

    create({ projectId, name }) {
        const contractor = { id: v4(), projectId, name }
        this.contractors.push(contractor)
        return contractor
    }

    remove(id: string) {
      const index = this.contractors.findIndex(project => project.id === id)
      if (index < 0) return null

      this.contractors  = this.contractors.filter(project => project.id !== id)

      return {}
    }

}
