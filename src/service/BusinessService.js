const baseUrl = '/api/v3/businesses'
// const token = 'Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx';
// const headers = {
//     'Authorization': 'Bearer ' + token,
// }

export const BusinessService = {
    getBusinessLists: (params = {}) => {
        let url = `${baseUrl}/search?location=ID&sort_by=best_match`;

        Object.keys(params).forEach(key => {
            url += `&${key}=${params[key]}`;
        });

        return fetch(url);
    },
    getBusinessDetail: (id) => {
        return fetch(`${baseUrl}/${id}`);
    },
    getBusinessReviews: (id) => {
        return fetch(`${baseUrl}/${id}/reviews`);
    },
    getBusinessFilters: () => {
        return [
            {
                value: 'hot_and_new',
                label: 'Hot and New'
            },
            {
                value: 'request_a_quote',
                label: 'Request a Quote'
            },
            {
                value: 'reservation',
                label: 'Reservation'
            },
            {
                value: 'waitlist_reservation',
                label: 'Waitlist Reservation'
            },
            {
                value: 'deals',
                label: 'Deals'
            },
            {
                value: 'open_to_all',
                label: 'Open to All'
            },
            {
                value: 'gender_neutral_restrooms',
                label: 'Gender Neutral Restrooms'
            },
            {
                value: 'wheelchair_accessible',
                label: 'Wheelchair Accessible'
            },
        ];
    }
}