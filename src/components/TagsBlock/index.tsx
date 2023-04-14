import React from 'react'
import SideBlock from "@/components/SideBlock"
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton} from "@mui/material"
import TagIcon from "@mui/icons-material/Tag"
import Link from "next/link"

type TTagsBlock = {
  isLoading: boolean
  items: string[]
}

const TagsBlock = ({isLoading, items}: TTagsBlock) => {
  return (
    <SideBlock title="Top tags">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <Link
            key={i}
            style={{textDecoration: "none", color: "black"}}
            href={`/tags/${name}`}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon/>
                </ListItemIcon>
                {isLoading
                  ? <Skeleton width={100}/>
                  : <ListItemText primary={name}/>
                }
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {!isLoading && items.length < 1 && <ListItem><i>No tags yet</i></ListItem>}
      </List>
    </SideBlock>
  )
}

export default TagsBlock