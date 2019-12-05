import React, {Component} from 'react'

import {
    SearchkitManager, SearchkitProvider, SearchBox,
    HierarchicalMenuFilter, RefinementListFilter, LayoutResults,
    ActionBar, ActionBarRow, HitsStats, SelectedFilters,
    ResetFilters, MovieHitsGridItem, NoHits,
    Hits, Layout, TopBar, LayoutBody, SideBar
} from 'searchkit';


export default function(props) {
  const { api_url } = props;
  const searchkit = new SearchkitManager(api_url);
  return (
    <SearchkitProvider searchkit={searchkit}>
      <Layout>
          <SearchBox
            autofocus={true}
            searchOnChange={true}
            prefixQueryFields={["actors^1","type^2","languages","title^10"]}/>
        <LayoutBody>
          <SideBar>
            <HierarchicalMenuFilter
              fields={["type.raw", "genres.raw"]}
              title="Categories"
              id="categories"/>
            <RefinementListFilter
              id="actors"
              title="Actors"
              field="actors.raw"
              operator="AND"
              size={10}/>
          </SideBar>
          <LayoutResults>
            <ActionBar>

              <ActionBarRow>
                <HitsStats/>
              </ActionBarRow>

              <ActionBarRow>
                <SelectedFilters/>
                <ResetFilters/>
              </ActionBarRow>

            </ActionBar>
            <Hits mod="sk-hits-list" hitsPerPage={10} itemComponent={MovieHitsGridItem}
              sourceFilter={["title", "poster", "imdbId"]}/>
            <NoHits/>
          </LayoutResults>
        </LayoutBody>
      </Layout>
    </SearchkitProvider>
  );
}
