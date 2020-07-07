import React from 'react'
import LifeCycle from './LifeCycle'
import {RouterContext} from './Context'

export default function Prompt({ message, when = true }) {  
    return (
        <RouterContext.Consumer>
            {
                context => {
                    console.log('context', message, when); //charlie_log
                    if (!when) return null
                    let method = context.history.block
                    return (
                        <LifeCycle
                            onMount={self => {
                                self.release = method(message)
                            }}
                            unOnMount={self => {
                                self.release()
                            }}
                        />
                    )
                }
            }
        </RouterContext.Consumer>
    )
}
