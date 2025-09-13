import { BadRequestException, NotFoundException } from "@nestjs/common"

export const throwBadRequestException = (data, message) => {
    if (data) throw new BadRequestException(message)
}


export const throwNotFoundRequestException = (data, message) => {
    if (!data || data.lenght === 0) throw new NotFoundException(message)
}