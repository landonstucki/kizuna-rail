import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {

    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();
    const routes = await getAllRoutes();

    // 🔥 Grab query parameters
    const regionFilter = req.query.region || '';
    const seasonFilter = req.query.season || '';

    // 🔥 Filter routes
    const filteredRoutes = routes.filter(route => {

        const matchesRegion =
            !regionFilter || route.region === regionFilter;

        const matchesSeason =
            !seasonFilter || route.bestSeason === seasonFilter;

        return matchesRegion && matchesSeason;
    });

    res.render('routes/list', {
        title: 'Scenic Train Routes',
        regions,
        seasons,
        routes: filteredRoutes
    });
};

