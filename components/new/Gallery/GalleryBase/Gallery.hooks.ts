import { useSearchParams } from "next/navigation";
import { GalleryStateType } from "./Gallery";
import { useEffect, useReducer } from "react";
import GalleryBaseReducer from "./Gallery.reducer";
import { getDataBySearch } from "kotilogi-app/actions/getDataBySearch";
import { serverGetDataOffset } from "kotilogi-app/actions/serverGetData";
import getDataOffset from "./Util/getDataOffset";

export function useGallery(tableName: Kotilogi.Table, query: any){
    const searchParams = useSearchParams();
    const pageParam = searchParams.get('page');
    const currentPage: number = pageParam ? parseInt(pageParam) : 0;

    const initialState: GalleryStateType = {
        data: [],
        selectedItems: [],
        showEditModal: false,
        isLoading: true,
        error: false,
        currentPage,
        search: {
            what: '',
            column: null,
        },
    }

    const [state, dispatch] = useReducer(GalleryBaseReducer, initialState);

    function fetchData(pageNumber: number){
        serverGetDataOffset(tableName, query, getDataOffset(pageNumber, 10), 10)
        .then((data: any[]) => {
          if(!data){
            dispatch({
                type: 'toggle_error',
                value: true,
            });
          }
          else{
            //Sort the data by the time column, if one is present.
            data = data.sort((a, b) => {
                if('time' in a && 'time' in b){
                    const ams = new Date(a.time).getTime();
                    const bms = new Date(b.time).getTime();
                    
                    switch(tableName){
                        case 'usage': return ams - bms;

                        default: return bms - ams;
                    }
                }
                else{
                    return 0;
                }
            });

            dispatch({
                type: 'set_data',
                value: data,
            });
          }
        })
        .finally(() => {
            dispatch({
                type: 'toggle_loading',
                value: false,
            });
        })
    }

    useEffect(() => {
        dispatch({
            type: 'toggle_loading',
            value: true,
        });

        if(state.search.what === ''){
            //Fetch everything when the string is empty.
            fetchData(0);
        }
        else{
            getDataBySearch(tableName, state.search)
            .then(data => {
                dispatch({
                    type: 'set_data',
                    value: data,
                })
            })
            .catch(err => console.log(err.message));
        }

        dispatch({
            type: 'toggle_loading',
            value: false,
        });
        
    }, [state.search.what]);   
    
    return {
        state,
        dispatch,
    }
}