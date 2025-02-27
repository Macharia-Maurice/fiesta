'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import { useSearchParams, useRouter } from 'next/navigation'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from '@/lib/actions/category.actions'
import { ICategory } from '@/lib/database/models/category.model'

const CategoryFilter = () => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategories();

            if (categoryList) {
                setCategories(categoryList as ICategory[]);
            }
        }
        getCategories();

    }, [])

    const onSelectCategory = (category: string) => {
        let newUrl: any = ''
        if (category && category !== 'All') {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'category',
                value: category
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['category'],
            })
        }

        router.push(newUrl, { scroll: false })
    }
    
    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All" className='select-item p-regular-14'>All</SelectItem>
                {categories.map((category) => (
                    <SelectItem value={category.name} key={category._id} className='select-item p-regular-14'>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>

    )
}

export default CategoryFilter